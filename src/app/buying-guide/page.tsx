import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { buyingQuestions } from "@/lib/buying-guide";
import BuyingQuestions from "@/components/BuyingQuestions";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

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
    <article className="bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <PageHeader eyebrow="Buying guide" title={<>Your next order,<br /><em className="text-amber-bright">made simpler.</em></>} sub="Everest Super Chemical Udhyog supplies water treatment, pool and cleaning chemicals from Kathmandu to businesses across Nepal. Start with your product, quantity and delivery location; the team will confirm pricing and availability." />
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
        <Reveal><BuyingQuestions /></Reveal>
        <p className="text-sm text-muted">Business information from Everest Super Chemical Udhyog. Confirm current product and delivery details with the team when ordering.</p>
      </div>
    </article>
  );
}
