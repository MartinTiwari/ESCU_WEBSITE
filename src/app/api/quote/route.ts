import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

// Best-effort in-memory rate limit: N requests per IP per window. This
// resets whenever the serverless function cold-starts, so on a
// multi-instance host (Vercel under real load) it is a speed bump, not a
// hard guarantee — it stops a script hammering one warm instance, but a
// distributed botnet needs the edge-level protection described below.
// For a real guarantee, add a Vercel Firewall rate-limit rule or swap
// this Map for a shared store such as Upstash Redis.
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
  const candidate = fwd ? fwd.split(",")[0].trim() : req.headers.get("x-real-ip") || "unknown";
  return candidate.slice(0, 64);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_LIMITS = {
  name: 200,
  company: 200,
  phone: 200,
  email: 200,
  products: 3000,
  quantity: 1000,
  deliveryTown: 200,
  message: 3000,
} as const;
const MAX_REQUEST_BYTES = 32 * 1024;

function hasTrustedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  if (origin !== new URL(site.url).origin && origin !== req.nextUrl.origin) return false;
  const fetchSite = req.headers.get("sec-fetch-site");
  return !fetchSite || fetchSite === "same-origin";
}

function clean(v: unknown): string {
  if (typeof v !== "string") return "";
  // strip stray control characters, but keep newlines — the message /
  // product-list fields are meant to hold multi-line input
  return v.replace(/\r\n?/g, "\n").replace(/[\x00-\x09\x0b-\x1f\x7f]+/g, " ").trim();
}

// for fields that end up in the email subject: no newlines allowed, so
// nothing here can smuggle extra headers into the outgoing email
function cleanSingleLine(v: unknown): string {
  return clean(v).replace(/[\r\n]+/g, " ");
}

export async function POST(req: NextRequest) {
  if (!hasTrustedOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }
  const declaredLength = Number(req.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later, or contact us on WhatsApp." },
      { status: 429, headers: { "Retry-After": String(WINDOW_MS / 1000) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }
    body = JSON.parse(raw);
    if (!body || Array.isArray(body) || typeof body !== "object") throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: a field real visitors never see or fill in. Bots that
  // auto-fill every input on the form trip this.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  // Client clocks and autofill speed are not reliable abuse signals.
  // Origin, honeypot and rate checks above protect this endpoint instead.
  const fieldErrors: Record<string, string> = {};
  for (const [field, max] of Object.entries(FIELD_LIMITS)) {
    const value = body[field];
    if (value !== undefined && typeof value !== "string") {
      fieldErrors[field] = "Enter text for this field.";
    } else if (typeof value === "string" && value.length > max) {
      fieldErrors[field] = `Use ${max} characters or fewer.`;
    }
  }
  if (body.productUncertain !== undefined && typeof body.productUncertain !== "boolean") {
    fieldErrors.products = "Choose whether you need help selecting a product.";
  }
  const fulfillment = body.fulfillment === undefined ? "unsure" : body.fulfillment;
  if (!["delivery", "pickup", "unsure"].includes(fulfillment as string)) {
    fieldErrors.fulfillment = "Choose delivery, pickup or not sure yet.";
  }
  const name = cleanSingleLine(body.name);
  const company = cleanSingleLine(body.company);
  const phone = cleanSingleLine(body.phone);
  const email = cleanSingleLine(body.email);
  const productUncertain = body.productUncertain === true;
  const products = clean(body.products);
  const quantity = clean(body.quantity);
  const deliveryTown = cleanSingleLine(body.deliveryTown);
  const message = clean(body.message);

  if (!name) fieldErrors.name = "Enter your name.";
  if (!phone) fieldErrors.phone = "Enter a phone number so we can reach you.";
  if (!products && !productUncertain) fieldErrors.products = "Tell us what you need, or choose help selecting a product.";
  if (email && !EMAIL_RE.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (Object.keys(fieldErrors).length) {
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
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
        `Product(s): ${products || "Not sure yet — please help me choose"}`,
        `Help choosing a product: ${productUncertain ? "Yes" : "No"}`,
        `Quantity: ${quantity || "-"}`,
        `Delivery town: ${deliveryTown || "Not specified"}`,
        `Delivery / pickup preference: ${fulfillment === "delivery" ? "Delivery" : fulfillment === "pickup" ? "Pickup" : "Not sure yet"}`,
        `Message: ${message || "-"}`,
      ].join("\n"),
    });
    if (result.error) throw result.error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send quote email", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
