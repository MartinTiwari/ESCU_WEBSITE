"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { whatsappLink } from "@/lib/site";
import Turnstile, { TURNSTILE_SITE_KEY } from "@/components/Turnstile";

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
  const [turnstileToken, setTurnstileToken] = useState("");
  // bumped on every failed attempt to force a fresh Turnstile widget —
  // its tokens are single-use and expire after a few minutes
  const [attempt, setAttempt] = useState(0);
  // when the form mounted, so the server can tell a scripted instant
  // submit apart from a real person filling it out
  const renderedAt = useRef(Date.now());

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
        <div className="w-12 h-12 notch-sm bg-amber/12 border border-amber/30 grid place-items-center mx-auto mb-5 text-amber text-xl">✓</div>
        <div className="eyebrow text-amber mb-2">Request received</div>
        <h2 className="font-display text-2xl text-ink mb-2">Thank you!</h2>
        <p className="text-muted">
          Your request has been sent. We&apos;ll get back to you shortly at {form.phone || form.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 relative">
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

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name *">
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Company">
          <input value={form.company} onChange={(e) => update("company", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Phone *">
          <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
        </Field>
      </div>
      <Field label="Product(s) Needed *">
        <input required value={form.products} onChange={(e) => update("products", e.target.value)} className={inputClass} placeholder="e.g. PAC Powder, Liquid Chlorine" />
      </Field>
      <Field label="Quantity">
        <input value={form.quantity} onChange={(e) => update("quantity", e.target.value)} className={inputClass} placeholder="e.g. 50 bags, 100 litres" />
      </Field>
      <Field label="Message">
        <textarea value={form.message} onChange={(e) => update("message", e.target.value)} className={inputClass} rows={4} />
      </Field>

      <Turnstile key={attempt} onToken={setTurnstileToken} />

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong sending your request. Please try WhatsApp instead, or call us directly.
        </p>
      )}
      {status === "rate-limited" && (
        <p className="text-red-600 text-sm">
          You&apos;ve sent a few requests already. Please wait a bit before trying again, or reach us on WhatsApp.
        </p>
      )}
      {status === "verify-failed" && (
        <p className="text-red-600 text-sm">
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

const inputClass =
  "w-full bg-paper border border-line px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-muted/60 focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/15";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow block text-grey-700 text-[0.6rem] mb-2">{label}</span>
      {children}
    </label>
  );
}
