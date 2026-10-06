"use client";

import { useState } from "react";
import Link from "next/link";
import { buyingQuestions } from "@/lib/buying-guide";

function Answer({ item }: { item: (typeof buyingQuestions)[number] }) {
  return (
    <>
      <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{item.answer}</p>
      <Link href={item.href} className="mt-7 inline-flex min-h-11 items-center gap-4 border-b border-amber-deep pb-1 text-sm font-semibold text-ink transition-colors hover:text-amber-deep">
        {item.link}<span aria-hidden="true">↗</span>
      </Link>
    </>
  );
}

export default function BuyingQuestions() {
  const [active, setActive] = useState(0);
  return (
    <section aria-labelledby="buying-questions-title" className="mb-14">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3 text-amber-deep">Before you order</p>
          <h2 id="buying-questions-title" className="font-display text-3xl leading-tight text-ink sm:text-4xl">Good questions. Clear answers.</h2>
        </div>
        <p className="text-sm text-muted">Select a question to find your next step.</p>
      </div>

      <div className="hidden overflow-hidden border border-line md:grid md:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-paper-2 p-3" aria-label="Buying questions">
          {buyingQuestions.map((item, index) => (
            <button key={item.id} id={`question-${item.id}`} type="button" aria-expanded={active === index} aria-controls={`answer-${item.id}`} onClick={() => setActive(index)} className={`group flex min-h-16 w-full items-center gap-4 px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber-deep ${active === index ? "bg-ink text-cream" : "text-ink hover:bg-ink/5"}`}>
              <span aria-hidden="true" className={`text-xs tabular-nums ${active === index ? "text-amber" : "text-muted"}`}>{String(index + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-sm leading-relaxed font-medium">{item.question}</span>
              <span aria-hidden="true" className={active === index ? "text-amber" : "text-muted"}>→</span>
            </button>
          ))}
        </div>
        <div className="bg-cream p-8 lg:p-12">
          {buyingQuestions.map((item, index) => (
            <div key={item.id} id={`answer-${item.id}`} role="region" aria-labelledby={`question-${item.id}`} hidden={active !== index}>
              <p aria-hidden="true" className="mb-8 font-display text-5xl text-amber-deep/60">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mb-5 font-display text-2xl leading-snug text-ink lg:text-3xl">{item.question}</h3>
              <Answer item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line md:hidden">
        {buyingQuestions.map((item, index) => (
          <details key={item.id} id={item.id} className="group scroll-mt-24 border-b border-line open:bg-paper-2">
            <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 px-4 py-5 text-ink focus-visible:outline-2 focus-visible:outline-amber-deep [&::-webkit-details-marker]:hidden">
              <span aria-hidden="true" className="text-xs tabular-nums text-amber-deep">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="flex-1 text-base leading-relaxed font-medium">{item.question}</h3>
              <span aria-hidden="true" className="text-xl text-amber-deep transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-5 pb-7"><Answer item={item} /></div>
          </details>
        ))}
      </div>
    </section>
  );
}
