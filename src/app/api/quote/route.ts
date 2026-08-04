import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, company, phone, email, products, quantity, message } = body;

  if (!name || !phone || !products) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
