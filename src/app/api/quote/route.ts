import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

// Best-effort in-memory rate limit: N requests per IP per window. This
// resets whenever the serverless function cold-starts, so on a
// multi-instance host (Vercel under real load) it is a speed bump, not a
// hard guarantee — it stops a script hammering one warm instance, but a
// distributed botnet needs the edge-level protection described below.
// For a real guarantee, put this behind Cloudflare (rate limiting rule /
// Turnstile on the domain) or swap this Map for Upstash Redis.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  // keep the map from growing forever across a long-lived warm instance
  if (hits.size > 5000) {
    for (const [key, arr] of hits) {
      if (arr.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return timestamps.length > MAX_PER_WINDOW;
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SHORT = 200;
const MAX_LONG = 3000;

function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  // strip stray control characters, but keep newlines — the message /
  // product-list fields are meant to hold multi-line input
  return v.replace(/[\t\x00-\x09\x0b-\x1f]+/g, " ").trim().slice(0, max);
}

// for fields that end up in the email subject: no newlines allowed, so
// nothing here can smuggle extra headers into the outgoing email
function cleanSingleLine(v: unknown, max: number): string {
  return clean(v, max).replace(/[\r\n]+/g, " ");
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later, or contact us on WhatsApp." },
      { status: 429, headers: { "Retry-After": String(WINDOW_MS / 1000) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: a field real visitors never see or fill in. Bots that
  // auto-fill every input on the form trip this.
  if (clean(body.website, MAX_SHORT)) {
    return NextResponse.json({ ok: true });
  }

  // Time trap: the form records when it rendered. Kept deliberately low
  // (400ms, not the ~1200ms a first draft used) — browser autofill can
  // legitimately fill and submit a multi-field form in under a second,
  // and silently discarding a real customer's lead is worse than letting
  // a slightly-faster bot through; the honeypot above and Turnstile below
  // still catch those. Missing timestamp is still a hard reject (no
  // legitimate client omits it).
  const renderedAt = Number(body.formRenderedAt);
  if (!Number.isFinite(renderedAt)) {
    return NextResponse.json({ ok: true });
  }
  if (Date.now() - renderedAt < 400) {
    return NextResponse.json({ ok: true });
  }

  // Cloudflare Turnstile: only enforced once a secret key is configured,
  // so the form keeps working on environments that haven't set one up.
  // Unlike the honeypot/timing checks above, a failure here is shown to
  // the visitor (a token can legitimately expire if the form sits open
  // a few minutes), so it returns a real error instead of a silent ok.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
    if (!token) {
      return NextResponse.json({ error: "Verification failed" }, { status: 403 });
    }
    try {
      const verifyRes = await fetch("https://challenge.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: turnstileSecret, response: token, remoteip: ip }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json({ error: "Verification failed" }, { status: 403 });
      }
    } catch (err) {
      console.error("Turnstile verification request failed", err);
      return NextResponse.json({ error: "Verification failed" }, { status: 403 });
    }
  }

  const name = cleanSingleLine(body.name, MAX_SHORT);
  const company = cleanSingleLine(body.company, MAX_SHORT);
  const phone = cleanSingleLine(body.phone, MAX_SHORT);
  const email = cleanSingleLine(body.email, MAX_SHORT);
  const products = clean(body.products, MAX_LONG);
  const quantity = clean(body.quantity, MAX_SHORT);
  const message = clean(body.message, MAX_LONG);

  if (!name || !phone || !products) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      // Must be an address on a domain verified in Resend. The old default was
      // Resend's shared sandbox (onboarding@resend.dev), which only delivers to
      // the Resend account owner — quote requests to any other inbox were
      // silently rejected.
      from: process.env.QUOTE_FROM_EMAIL || `ESCU Website <quotes@${new URL(site.url).hostname.replace(/^www\./, "")}>`,
      to: site.email,
      replyTo: email || undefined,
      subject: `New Quote Request from ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || "-"}`,
        `Phone: ${phone}`,
        `Email: ${email || "-"}`,
        `Product(s): ${products}`,
        `Quantity: ${quantity || "-"}`,
        `Message: ${message || "-"}`,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send quote email", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
