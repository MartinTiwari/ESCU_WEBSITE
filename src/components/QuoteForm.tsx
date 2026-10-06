"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { whatsappLink } from "@/lib/site";

const LIMITS = { name: 200, company: 200, phone: 200, email: 200, products: 3000, quantity: 1000, deliveryTown: 200, message: 3000 } as const;
type FieldName = keyof typeof LIMITS | "fulfillment";
type QuoteDraft = Record<keyof typeof LIMITS, string> & {
  fulfillment: "delivery" | "pickup" | "unsure";
  productUncertain: boolean;
  website: string;
};
const DRAFT_KEY = "escu-quote-draft-v1";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER: FieldName[] = ["name", "company", "phone", "email", "products", "quantity", "deliveryTown", "fulfillment", "message"];
const STEPS = ["Your need", "Your contact", "Ready to send"];
function fieldStep(field: FieldName) {
  return field === "products" || field === "quantity" ? 0 : ["name", "phone", "company", "email"].includes(field) ? 1 : 2;
}

function validateField(name: FieldName, form: QuoteDraft): string {
  if (name === "fulfillment") return "";
  const value = form[name];
  if (value.length > LIMITS[name]) return `Use ${LIMITS[name]} characters or fewer.`;
  if (name === "name" && !value.trim()) return "Enter your name.";
  if (name === "phone" && !value.trim()) return "Enter a phone number so we can reach you.";
  if (name === "products" && !value.trim() && !form.productUncertain) return "Tell us what you need, or choose help selecting a product.";
  if (name === "email" && value.trim() && !EMAIL_RE.test(value.trim())) return "Enter a valid email address.";
  return "";
}

function fulfillmentLabel(value: QuoteDraft["fulfillment"]) {
  return value === "delivery" ? "Delivery" : value === "pickup" ? "Pickup" : "Not sure yet";
}

function saveDraft(form: QuoteDraft) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ ...form, website: "" }));
  } catch {
    // Storage may be disabled or full. The form still works normally.
  }
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const prefillProduct = searchParams.get("product") || "";
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "rate-limited">("idle");
  const [form, setForm] = useState<QuoteDraft>({ name: "", company: "", phone: "", email: "", products: prefillProduct, quantity: "", deliveryTown: "", fulfillment: "unsure", productUncertain: false, message: "", website: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(0);
  const [contactExtras, setContactExtras] = useState(false);
  const [deliveryExtras, setDeliveryExtras] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const pendingFocus = useRef<FieldName | "heading" | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "null");
      if (!saved || typeof saved !== "object" || Array.isArray(saved)) return;
      // Restore only recognized, valid draft values from external storage.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((current) => {
        const restored = { ...current };
        for (const field of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
          if (typeof saved[field] === "string" && saved[field].length <= LIMITS[field]) restored[field] = saved[field];
        }
        if (["delivery", "pickup", "unsure"].includes(saved.fulfillment)) restored.fulfillment = saved.fulfillment;
        restored.productUncertain = saved.productUncertain === true;
        if (prefillProduct) {
          restored.products = prefillProduct;
          restored.productUncertain = false;
        }
        return restored;
      });
    } catch {
      // A malformed draft or unavailable storage must never block an enquiry.
    }
  }, [prefillProduct]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  useEffect(() => {
    const target = pendingFocus.current;
    if (!target) return;
    if (target === "heading") stepHeadingRef.current?.focus();
    else formRef.current?.querySelector<HTMLElement>(`#qf-${target}`)?.focus();
    pendingFocus.current = null;
  }, [step, contactExtras, deliveryExtras, errors]);

  useEffect(() => {
    // Server validation arrives while inputs are disabled; focus after enabling them.
    if (status === "error") {
      const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
      if (firstInvalid) formRef.current?.querySelector<HTMLElement>(`#qf-${firstInvalid}`)?.focus();
    }
  }, [status, errors]);

  function update<K extends keyof QuoteDraft>(key: K, value: QuoteDraft[K]) {
    const next = { ...form, [key]: value };
    setForm(next);
    saveDraft(next);
    if (key in LIMITS || key === "fulfillment") {
      const field = key as FieldName;
      if (errors[field]) setErrors((previous) => ({ ...previous, [field]: validateField(field, next) }));
    }
    if (key === "productUncertain") setErrors((previous) => ({ ...previous, products: validateField("products", next) }));
  }

  function handleBlur(name: FieldName) {
    setErrors((previous) => ({ ...previous, [name]: validateField(name, form) }));
  }

  function showFieldErrors(next: Partial<Record<FieldName, string>>) {
    setErrors(next);
    const firstInvalid = FIELD_ORDER.find((field) => next[field]);
    if (firstInvalid) {
      pendingFocus.current = firstInvalid;
      setStep(fieldStep(firstInvalid));
      if (firstInvalid === "company" || firstInvalid === "email") setContactExtras(true);
      if (fieldStep(firstInvalid) === 2) setDeliveryExtras(true);
      formRef.current?.querySelector<HTMLElement>(`#qf-${firstInvalid}`)?.focus();
    }
    return !firstInvalid;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submittingRef.current) return;
    if (step < 2) {
      const fields: FieldName[] = step === 0 ? ["products", "quantity"] : ["name", "phone", "company", "email"];
      const next: Partial<Record<FieldName, string>> = {};
      for (const field of fields) {
        const error = validateField(field, form);
        if (error) next[field] = error;
      }
      if (!showFieldErrors(next)) return;
      pendingFocus.current = "heading";
      setStep(step + 1);
      return;
    }
    const next: Partial<Record<FieldName, string>> = {};
    for (const field of FIELD_ORDER) {
      const error = validateField(field, form);
      if (error) next[field] = error;
    }
    if (!showFieldErrors(next)) return;
    submittingRef.current = true;
    setStatus("submitting");
    setErrorMessage("");
    try {
      const response = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (response.status === 429) {
        setStatus("rate-limited");
        return;
      }
      if (response.status === 400) {
        const result = await response.json();
        const serverErrors: Partial<Record<FieldName, string>> = {};
        for (const field of FIELD_ORDER) {
          if (typeof result.fieldErrors?.[field] === "string") serverErrors[field] = result.fieldErrors[field];
        }
        showFieldErrors(serverErrors);
        setErrorMessage("Your request was not sent. Please check the fields and try again.");
        setStatus("error");
        return;
      }
      if (!response.ok) throw new Error("Request failed");
      try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* Storage is optional. */ }
      setStatus("success");
    } catch {
      setErrorMessage("We couldn't confirm your request was sent. Please try again, send it via WhatsApp, or call us.");
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  const productSummary = form.products.trim() || "Not sure yet — please help me choose";
  const waMessage = [
    "Hi ESCU, I'd like a quote.", `Name: ${form.name}`, `Company: ${form.company || "-"}`, `Phone: ${form.phone}`, `Email: ${form.email || "-"}`,
    `Products and quantities: ${productSummary}`, `Help choosing a product: ${form.productUncertain ? "Yes" : "No"}`, ...(form.quantity ? [`Additional quantities: ${form.quantity}`] : []),
    `Delivery town: ${form.deliveryTown || "Not specified"}`, `Delivery / pickup preference: ${fulfillmentLabel(form.fulfillment)}`, `Message: ${form.message || "-"}`,
  ].join("\n");

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="region" aria-labelledby="quote-success-title" className="py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-deep">
        <h2 id="quote-success-title" className="font-display text-2xl text-ink mb-3">Your quote request is received.</h2>
        <p className="text-muted mb-6">We usually reply the same working day during business hours. We&apos;ll contact you at <span className="text-ink break-all">{form.phone}</span>{form.email && <> or <span className="text-ink break-all">{form.email}</span></>}.</p>
        <dl className="border-y border-line py-5 mb-6 space-y-4 text-sm">
          {[
            ["Products and quantities", productSummary],
            ...(form.quantity ? [["Additional quantities", form.quantity]] : []),
            ["Delivery town", form.deliveryTown || "To be discussed"],
            ["Preference", fulfillmentLabel(form.fulfillment)],
            ...(form.productUncertain ? [["Product advice", "Help selecting a suitable product requested"]] : []),
            ...(form.message ? [["Message", form.message]] : []),
          ].map(([label, value]) => <div key={label}><dt className="font-medium text-ink mb-1">{label}</dt><dd className="text-muted whitespace-pre-wrap break-words">{value}</dd></div>)}
        </dl>
        <Link href="/products" className="text-sm font-medium text-ink link-ul">Browse the full catalogue →</Link>
      </div>
    );
  }

  function fieldProps(field: keyof typeof LIMITS) {
    return {
      id: `qf-${field}`, name: field, maxLength: LIMITS[field], value: form[field],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(field, event.target.value),
      onBlur: () => handleBlur(field),
      "aria-invalid": !!errors[field],
      "aria-describedby": [field === "products" ? "qf-products-hint" : "", errors[field] ? `qf-${field}-error` : ""].filter(Boolean).join(" ") || undefined,
      className: inputClass(!!errors[field]),
    };
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={status === "submitting"} className="space-y-5 relative">
      <ol aria-label="Quote progress" className="flex gap-2 border-b border-line pb-5">
        {STEPS.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className="flex-1 flex items-center gap-2 text-xs sm:text-sm">
          <span aria-hidden="true" className={`grid shrink-0 w-7 h-7 place-items-center rounded-full font-medium ${index <= step ? "bg-ink text-cream" : "bg-paper2 text-muted"}`}>{index < step ? "✓" : index + 1}</span>
          <span className={step === index ? "text-ink font-medium" : "text-muted"}>{label}</span>
        </li>)}
      </ol>
      <div className="absolute top-0 left-0 w-px h-px opacity-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} />
      </div>
      <fieldset disabled={status === "submitting"} className="space-y-5 min-w-0">
        <legend className="sr-only">Quote request details</legend>
        <div>
          <p className="eyebrow text-amber-deep mb-2">Step {step + 1} of 3</p>
          <h2 ref={stepHeadingRef} tabIndex={-1} className="font-display text-2xl sm:text-3xl text-ink focus:outline-none">{["What can we help you with?", "Who should we call?", "Looking good. Let’s send it."][step]}</h2>
          <p className="text-sm text-muted mt-2">{["A product name or a rough idea — either works.", "Just your name and phone. We’ll take it from there.", "Add delivery details if you know them, or leave them for our conversation."][step]}</p>
        </div>
        {step === 1 && <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
          <Field id="qf-name" label="Full name *" error={errors.name}><input {...fieldProps("name")} required autoComplete="name" /></Field>
          <Field id="qf-phone" label="Phone *" error={errors.phone}><input {...fieldProps("phone")} required type="tel" autoComplete="tel" placeholder="e.g. 98XXXXXXXX" /></Field>
          </div>
          <button type="button" aria-expanded={contactExtras} aria-controls="qf-contact-extras" onClick={() => setContactExtras(!contactExtras)} className="text-sm text-ink underline underline-offset-4 py-2">{contactExtras ? "− Hide" : "+ Add"} company or email (optional)</button>
          {contactExtras && <div id="qf-contact-extras" className="grid sm:grid-cols-2 gap-5">
          <Field id="qf-company" label="Company (optional)" error={errors.company}><input {...fieldProps("company")} autoComplete="organization" /></Field>
          <Field id="qf-email" label="Email (optional)" error={errors.email}><input {...fieldProps("email")} type="email" autoComplete="email" /></Field>
          </div>}
        </div>}
        {step === 0 && <div className="space-y-3">
          <Field id="qf-products" label={form.productUncertain ? "Your requirement (optional)" : "Your requirement *"} error={errors.products}>
            <textarea {...fieldProps("products")} required={!form.productUncertain} rows={3} placeholder={"e.g. PAC Powder, about 50 bags\nOr: I need something for cleaning floors"} />
          </Field>
          <p id="qf-products-hint" className="text-sm text-muted">Multiple items? Add them here. Quantities can wait if you’re unsure.</p>
          <label className={`flex items-center gap-3 text-sm text-ink cursor-pointer border rounded-lg p-3 ${form.productUncertain ? "border-amber-deep bg-amber/10" : "border-line bg-paper2"}`}>
            <input type="checkbox" name="productUncertain" checked={form.productUncertain} onChange={(event) => update("productUncertain", event.target.checked)} className="mt-0.5 w-5 h-5 accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-deep" />
            <span>Help me choose — I’m not sure yet.</span>
          </label>
        </div>}
        {step === 2 && <div className="space-y-4">
          <div className="bg-paper2 rounded-lg px-4 py-4 text-sm">
            <p className="text-ink whitespace-pre-wrap break-words">{productSummary}</p>
            <p className="text-muted mt-2">For {form.name} · <span className="break-all">{form.phone}</span></p>
            <button type="button" onClick={() => { pendingFocus.current = "heading"; setStep(0); }} className="text-ink underline underline-offset-4 mt-3">Edit requirement</button>
          </div>
          <button type="button" aria-expanded={deliveryExtras} aria-controls="qf-delivery-extras" onClick={() => setDeliveryExtras(!deliveryExtras)} className="text-sm text-ink underline underline-offset-4 py-2">{deliveryExtras ? "− Hide" : "+ Add"} delivery details or a note (optional)</button>
          {deliveryExtras && <div id="qf-delivery-extras" className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
          <Field id="qf-deliveryTown" label="Delivery town / city (optional)" error={errors.deliveryTown}><input {...fieldProps("deliveryTown")} autoComplete="address-level2" placeholder="e.g. Kathmandu, Pokhara" /></Field>
          <Field id="qf-fulfillment" label="Delivery or pickup?" error={errors.fulfillment}>
            <select id="qf-fulfillment" name="fulfillment" value={form.fulfillment} onChange={(event) => update("fulfillment", event.target.value as QuoteDraft["fulfillment"])} aria-invalid={!!errors.fulfillment} aria-describedby={errors.fulfillment ? "qf-fulfillment-error" : undefined} className={inputClass(!!errors.fulfillment)}>
              <option value="unsure">Not sure yet</option><option value="delivery">Delivery</option><option value="pickup">Pickup</option>
            </select>
          </Field>
        </div>
        <Field id="qf-message" label="Anything else? (optional)" error={errors.message}><textarea {...fieldProps("message")} rows={2} placeholder="Timing, intended use, or a question" /></Field>
          </div>}
        </div>}
      </fieldset>
      {status === "error" && <p className="text-hazard text-sm" role="alert">{errorMessage}</p>}
      {status === "rate-limited" && <p className="text-hazard text-sm" role="alert">You&apos;ve sent a few requests already. Please wait 10 minutes before trying again, or reach us on WhatsApp.</p>}
      <div className="flex flex-wrap gap-3 pt-2">
        {step > 0 && <button type="button" disabled={status === "submitting"} onClick={() => { pendingFocus.current = "heading"; setStep(step - 1); }} className="btn-secondary">← Back</button>}
        <button type="submit" disabled={status === "submitting"} className="group btn-primary">
          {status === "submitting" ? "Sending…" : step === 0 ? "Next: your contact" : step === 1 ? "Review request" : "Send request"}{status !== "submitting" && <span aria-hidden="true" className="transition-transform motion-reduce:transition-none group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">→</span>}
        </button>
      </div>
      <p className="text-sm text-muted">Prefer a chat? <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">{step === 2 ? "Send this via WhatsApp" : "Talk on WhatsApp"} ↗</a></p>
    </form>
  );
}

function inputClass(hasError: boolean) {
  const base = "w-full min-w-0 bg-paper border px-3.5 py-2.5 text-base text-ink transition-colors placeholder:text-muted focus:outline-none focus:ring-2 disabled:opacity-70";
  return hasError ? `${base} border-hazard focus:border-hazard focus:ring-hazard/15` : `${base} border-line focus:border-amber-deep focus:ring-amber/20`;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <label className="eyebrow block text-grey-700 mb-2" htmlFor={id}>{label}</label>
      {children}
      {error && <span id={`${id}-error`} role="alert" className="block text-hazard text-sm mt-1.5">{error}</span>}
    </div>
  );
}
