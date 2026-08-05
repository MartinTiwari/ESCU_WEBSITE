"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { whatsappLink } from "@/lib/site";
import { products } from "@/lib/products";
import Turnstile, { TURNSTILE_SITE_KEY } from "@/components/Turnstile";

type FieldName = "name" | "phone" | "products" | "email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: FieldName, value: string): string {
  switch (name) {
    case "name":
      return value.trim() ? "" : "Enter your name.";
    case "phone":
      return value.trim() ? "" : "Enter a phone number so we can reach you.";
    case "products":
      return value.trim() ? "" : "Tell us what you need — even a rough idea is fine.";
    case "email":
      return value.trim() && !EMAIL_RE.test(value.trim()) ? "That doesn't look like a valid email." : "";
    default:
      return "";
  }
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const prefillProduct = searchParams.get("product") || "";

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "rate-limited" | "verify-failed">("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    products: prefillProduct,
    quantity: "",
    message: "",
    website: "", // honeypot — real visitors never see or fill this in
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  // bumped on every failed attempt to force a fresh Turnstile widget —
  // its tokens are single-use and expire after a few minutes
  const [attempt, setAttempt] = useState(0);
  // when the form mounted, so the server can tell a scripted instant
  // submit apart from a real person filling it out. This is React's
  // documented "lazy ref initialization" pattern (avoids passing Date.now()
  // as useRef's argument, which re-evaluates every render even though only
  // the first result is kept) — capturing it any later, e.g. in an effect,
  // would delay the timestamp past first paint and skew the timing check.
  const renderedAt = useRef<number | null>(null);
  // eslint-disable-next-line react-hooks/purity -- see comment above
  if (renderedAt.current === null) renderedAt.current = Date.now();
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement>>>({});

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleBlur(name: FieldName) {
    setErrors((e) => ({ ...e, [name]: validateField(name, form[name]) }));
  }

  function validateAll(): boolean {
    const fields: FieldName[] = ["name", "phone", "products", "email"];
    const next: Partial<Record<FieldName, string>> = {};
    let firstInvalid: FieldName | null = null;
    for (const f of fields) {
      const msg = validateField(f, form[f]);
      if (msg) {
        next[f] = msg;
        if (!firstInvalid) firstInvalid = f;
      }
    }
    setErrors(next);
    if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
    return firstInvalid === null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAll()) return;
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("verify-failed");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formRenderedAt: renderedAt.current, turnstileToken }),
      });
      if (res.status === 429) {
        setStatus("rate-limited");
        setAttempt((a) => a + 1);
        setTurnstileToken("");
        return;
      }
      if (res.status === 403) {
        setStatus("verify-failed");
        setAttempt((a) => a + 1);
        setTurnstileToken("");
        return;
      }
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setAttempt((a) => a + 1);
      setTurnstileToken("");
    }
  }

  const waMessage = `Hi ESCU, I'd like a quote.\nName: ${form.name}\nCompany: ${form.company}\nProduct(s): ${form.products}\nQuantity: ${form.quantity}\nMessage: ${form.message}`;

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 notch-sm bg-amber/12 border border-amber/30 grid place-items-center mx-auto mb-5 text-amber-deep text-xl">✓</div>
        <div className="eyebrow text-amber-deep mb-2">Request received</div>
        <h2 className="font-display text-2xl text-ink mb-2">Thank you!</h2>
        <p className="text-muted mb-5">
          Your request has been sent. We&apos;ll get back to you shortly at {form.phone || form.email}.
        </p>
        <Link href="/products" className="text-sm font-medium text-ink link-ul">
          Browse the full catalogue →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 relative">
      {/* honeypot: hidden from real visitors (opacity/size, not
          display:none, since some bots skip that) but bots that fill
          every field trip it. Kept inside the form's own box so it can't
          cause page-level horizontal scroll. */}
      <div className="absolute top-0 left-0 w-px h-px opacity-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <datalist id="quote-product-options">
        {products.map((p) => (
          <option key={p.slug} value={p.name} />
        ))}
      </datalist>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="qf-name" label="Full Name *" error={errors.name}>
          <input
            id="qf-name"
            ref={(el) => { if (el) fieldRefs.current.name = el; }}
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "qf-name-error" : undefined}
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field id="qf-company" label="Company">
          <input
            id="qf-company"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass(false)}
          />
        </Field>
        <Field id="qf-phone" label="Phone *" error={errors.phone}>
          <input
            id="qf-phone"
            ref={(el) => { if (el) fieldRefs.current.phone = el; }}
            required
            type="tel"
            placeholder="e.g. 98XXXXXXXX"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "qf-phone-error" : undefined}
            className={inputClass(!!errors.phone)}
          />
        </Field>
        <Field id="qf-email" label="Email" error={errors.email}>
          <input
            id="qf-email"
            ref={(el) => { if (el) fieldRefs.current.email = el; }}
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "qf-email-error" : undefined}
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>
      <Field id="qf-products" label="Product(s) Needed *" error={errors.products}>
        <input
          id="qf-products"
          ref={(el) => { if (el) fieldRefs.current.products = el; }}
          required
          list="quote-product-options"
          value={form.products}
          onChange={(e) => update("products", e.target.value)}
          onBlur={() => handleBlur("products")}
          aria-invalid={!!errors.products}
          aria-describedby={errors.products ? "qf-products-error" : undefined}
          className={inputClass(!!errors.products)}
          placeholder="e.g. PAC Powder, Liquid Chlorine"
        />
      </Field>
      <Field id="qf-quantity" label="Quantity">
        <input
          id="qf-quantity"
          value={form.quantity}
          onChange={(e) => update("quantity", e.target.value)}
          className={inputClass(false)}
          placeholder="e.g. 50 bags, 100 litres"
        />
      </Field>
      <Field id="qf-message" label="Message">
        <textarea
          id="qf-message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass(false)}
          rows={4}
        />
      </Field>

      <Turnstile key={attempt} onToken={setTurnstileToken} />

      {status === "error" && (
        <p className="text-hazard text-sm" role="alert">
          Something went wrong sending your request. Please try WhatsApp instead, or call us directly.
        </p>
      )}
      {status === "rate-limited" && (
        <p className="text-hazard text-sm" role="alert">
          You&apos;ve sent a few requests already. Please wait a bit before trying again, or reach us on WhatsApp.
        </p>
      )}
      {status === "verify-failed" && (
        <p className="text-hazard text-sm" role="alert">
          Please complete the verification above, then try again.
        </p>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" disabled={status === "submitting"} className="group btn-primary">
          {status === "submitting" ? "Sending…" : "Send Request"}
          {status !== "submitting" && <span className="transition-transform group-hover:translate-x-1">→</span>}
        </button>
        <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          Send via WhatsApp instead
        </a>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  const base =
    "w-full bg-paper border px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-muted/60 focus:outline-none focus:ring-2";
  return hasError
    ? `${base} border-hazard focus:border-hazard focus:ring-hazard/15`
    : `${base} border-line focus:border-amber focus:ring-amber/15`;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="eyebrow block text-grey-700 mb-2">{label}</span>
      {children}
      {error && (
        <span id={`${id}-error`} role="alert" className="block text-hazard text-xs mt-1.5">
          {error}
        </span>
      )}
    </label>
  );
}
