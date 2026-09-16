import Link from "next/link";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { buyingQuestions } from "@/lib/buying-guide";

export const metadata = pageMetadata({
  title: "Buying Chemicals in Nepal: Wholesale Quotes & Delivery FAQs",
  description: "How to order chemicals from ESCU in Kathmandu: wholesale quotes, pack sizes, availability, delivery across Nepal, product specifications and contact details.",
  path: "/buying-guide",
});

export default function BuyingGuide() {
  const url = `${site.url}/buying-guide`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}/#webpage`,
    url,
    name: "Buying chemicals from ESCU in Nepal",
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: buyingQuestions.map(({ question, answer }) => ({
      "@type": "Question", name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return (
    <article className="bg-paper px-5 pt-32 pb-20 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight mb-6">Buying chemicals from ESCU in Nepal</h1>
        <p className="text-lg leading-relaxed text-ink/80 mb-8">Everest Super Chemical Udhyog supplies water treatment, pool and cleaning chemicals from Kathmandu to businesses across Nepal. Start with your product, quantity and delivery location; the team will confirm pricing and availability.</p>
        <nav aria-label="Buying questions" className="border-y border-line py-6 mb-10">
          <ul className="space-y-3">{buyingQuestions.map(({ id, question }) => <li key={id}><a className="text-ink underline underline-offset-4 hover:text-amber-deep" href={`#${id}`}>{question}</a></li>)}</ul>
        </nav>
        {buyingQuestions.map(({ id, question, answer, href, link }) => (
          <section key={id} id={id} className="scroll-mt-24 border-b border-line pb-8 mb-8">
            <h2 className="font-display text-2xl text-ink mb-3">{question}</h2>
            <p className="text-ink/80 leading-relaxed mb-4">{answer}</p>
            <Link className="text-ink underline underline-offset-4 hover:text-amber-deep" href={href}>{link}</Link>
          </section>
        ))}
        <p className="text-sm text-muted">Business information from Everest Super Chemical Udhyog. Confirm current product and delivery details with the team when ordering.</p>
      </div>
    </article>
  );
}
