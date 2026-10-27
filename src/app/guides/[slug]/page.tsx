import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import { guides, getGuide } from "@/lib/guides";
import { getProductBySlug } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return pageMetadata({ title: guide.title, description: guide.description, path: `/guides/${guide.slug}` });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const url = `${site.url}/guides/${guide.slug}`;
  const relatedProducts = guide.productSlugs.map(getProductBySlug).filter((product) => product !== undefined);
  const relatedGuides = guides.filter((item) => item.slug !== guide.slug && item.category === guide.category).slice(0, 2);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", "@id": `${url}/#article`, headline: guide.title, description: guide.description, url, mainEntityOfPage: url, inLanguage: "en", author: { "@id": `${site.url}/#organization` }, publisher: { "@id": `${site.url}/#organization` }, datePublished: guide.published, dateModified: guide.updated, citation: guide.sources.map((source) => source.url), isPartOf: { "@id": `${site.url}/#website` } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }, { "@type": "ListItem", position: 2, name: "Buying guides", item: `${site.url}/guides` }, { "@type": "ListItem", position: 3, name: guide.title, item: url }] },
    ],
  };
  return <article className="bg-paper">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <PageHeader eyebrow={guide.category} title={guide.title} sub={guide.summary} />
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Buying guides", href: "/guides" }, { name: guide.title }]} />
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        <div className="min-w-0">
          <p className="mb-8 text-xs leading-relaxed text-muted">By {site.name} · Published <time dateTime={guide.published}>27 October 2026</time></p>
          {guide.sections.map((section) => <section key={section.heading} className="mb-9 border-t border-line pt-6">
            <h2 className="mb-4 font-display text-2xl leading-snug text-ink sm:text-3xl">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-base leading-relaxed text-ink/80">{paragraph}</p>)}
            {section.checklist && <ul className="mt-5 space-y-3 border-l-2 border-amber pl-5 text-sm leading-relaxed text-ink/80">{section.checklist.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>)}
          <section className="border-t border-line pt-6">
            <h2 className="mb-3 font-display text-2xl text-ink">Sources and scope</h2>
            <p className="mb-4 text-sm leading-relaxed text-muted">General guidance checked on 27 October 2026 against the sources below. These sources do not verify ESCU&apos;s supplied specifications or replace the product label, SDS and site operator&apos;s instructions. Foreign guidance is background information, not a statement of Nepal&apos;s regulatory requirements.</p>
            <ul className="space-y-3 text-sm">{guide.sources.map((source) => <li key={source.url}><a href={source.url} className="text-ink underline underline-offset-4 break-words">{source.title}</a></li>)}</ul>
          </section>
        </div>
        <aside className="border-t-2 border-ink pt-5 lg:sticky lg:top-28">
          <h2 className="font-display text-xl text-ink mb-4">Products in this guide</h2>
          <ul className="divide-y divide-line">{relatedProducts.map((product) => <li key={product.slug}><Link href={`/products/${product.slug}`} className="block py-3 text-sm text-ink underline underline-offset-4 hover:text-amber-deep">{product.name}</Link></li>)}</ul>
          <div className="mt-7 bg-ink p-6 text-cream">
            <h2 className="font-display text-xl mb-3">Send us your requirements</h2>
            <p className="mb-5 text-sm leading-relaxed text-cream/75">Include your product, quantity and delivery location. SDS and related documents are provided after an enquiry.</p>
            <Link href="/quote" className="inline-block text-sm font-semibold text-amber-bright underline underline-offset-4">Request a quotation</Link>
            <a href={whatsappLink(`Hi ESCU, I read your guide: ${guide.title}. I'd like to discuss my requirements.`)} className="mt-4 block text-sm text-cream underline underline-offset-4">Discuss on WhatsApp</a>
          </div>
          {relatedGuides.length > 0 && <div className="mt-7"><h2 className="font-display text-xl text-ink mb-3">Read next</h2><ul className="space-y-4">{relatedGuides.map((item) => <li key={item.slug}><Link href={`/guides/${item.slug}`} className="text-sm text-ink underline underline-offset-4">{item.title}</Link></li>)}</ul></div>}
        </aside>
      </div>
    </div>
  </article>;
}
