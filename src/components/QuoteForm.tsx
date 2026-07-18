"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { whatsappLink } from "@/lib/site";

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const prefillProduct = searchParams.get("product") || "";

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    products: prefillProduct,
    quantity: "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const waMessage = `Hi ESCU, I'd like a quote.\nName: ${form.name}\nCompany: ${form.company}\nProduct(s): ${form.products}\nQuantity: ${form.quantity}\nMessage: ${form.message}`;

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 rounded-full bg-emerald/12 grid place-items-center mx-auto mb-5 text-emerald text-2xl">✓</div>
        <div className="eyebrow text-emerald mb-2">Request received</div>
        <h2 className="font-display text-2xl text-ink mb-2">Thank you!</h2>
        <p className="text-muted">
          Your request has been sent. We&apos;ll get back to you shortly at {form.phone || form.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong sending your request. Please try WhatsApp instead, or call us directly.
        </p>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-2 bg-emerald hover:bg-emerald-bright transition-all text-ink px-6 py-3.5 rounded-lg font-semibold text-sm disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Request"}
          {status !== "submitting" && <span className="transition-transform group-hover:translate-x-1">→</span>}
        </button>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-line hover:border-emerald transition-all px-6 py-3.5 rounded-lg font-semibold text-sm text-ink"
        >
          Send via WhatsApp instead
        </a>
      </div>
    </form>
  );
}

const inputClass =
  "w-full bg-paper border border-line rounded-lg px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-muted/60 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/15";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow block text-grey-700 text-[0.6rem] mb-2">{label}</span>
      {children}
    </label>
  );
}
