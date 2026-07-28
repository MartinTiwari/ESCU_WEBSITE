import { Suspense } from "react";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Get a Chemical Supply Quote | Bulk & Wholesale Pricing Nepal",
  description: "Request a no-obligation quote for water treatment, swimming pool, or housekeeping chemicals. Bulk and B2B rates available, with same-day replies during business hours.",
  keywords: ["chemical price quote Nepal", "bulk chemical order Nepal", "wholesale chemical pricing Nepal"],
  path: "/quote",
});

export default function QuotePage() {
  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="Get a Quote"
        title={<>Tell us what you need, <span className="italic text-emerald-bright">we&apos;ll price it.</span></>}
        sub="No payment, no commitment. Pricing is quote-based for bulk and B2B orders, and we usually reply the same working day."
      />

      <div className="max-w-5xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <div className="space-y-6">
              {[
                ["Same-day replies", "Send during business hours and we'll usually get back within the day."],
                ["No obligation", "A quote is just a quote, with no payment and no pressure to commit."],
                ["Bulk & B2B rates", "Volume pricing and long-term supply agreements available."],
              ].map(([t, d], i) => (
                <div key={t} className="flex gap-4">
                  <span className="eyebrow text-emerald text-[0.62rem] mt-1">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="font-display text-lg text-ink">{t}</div>
                    <p className="text-muted text-sm leading-relaxed mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-line">
                <div className="eyebrow text-muted mb-2">Prefer to talk?</div>
                <a href={`tel:${site.phone}`} className="font-display text-xl text-ink link-ul">{site.phone}</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-cream border border-line rounded-2xl p-6 md:p-8">
              <Suspense>
                <QuoteForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
