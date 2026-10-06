import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { categoryLandingPages, getCategoryLandingPage } from "@/lib/category-pages";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return categoryLandingPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = getCategoryLandingPage((await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    keywords: [page.title, page.category, `${page.category} Kathmandu`, `${page.category} wholesale Nepal`, `${page.category} supplier Nepal`],
    path: `/chemicals/${page.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getCategoryLandingPage((await params).slug);
  if (!page) notFound();
  const items = products.filter((product) => product.category === page.category);
  const url = `${site.url}/chemicals/${page.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "en",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@type": "Thing", name: page.category },
        mainEntity: { "@id": `${url}#products` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#products`,
        name: `${page.category} supplied by ESCU`,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: `${site.url}/products/${item.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Chemical products", item: `${site.url}/products` },
          { "@type": "ListItem", position: 3, name: page.category, item: url },
        ],
      },
    ],
  };

  return <div className="bg-paper">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <PageHeader eyebrow={page.eyebrow} title={page.title} sub={page.intro}>
      <Link href="/products" className="site-back-link">← Browse the full catalogue</Link>
    </PageHeader>
    <div className="max-w-6xl mx-auto px-5 py-14 md:py-20">
      <Breadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Chemical products", href: "/products" },
        { name: page.category },
      ]} />
      <section className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-start mb-20" aria-labelledby="category-products">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-amber-deep mb-4">What we supply</p>
            <h2 id="category-products" className="font-display text-3xl md:text-4xl text-ink mb-5">Products for the job.</h2>
            <p className="text-ink/65 leading-relaxed mb-7">{page.buyerSummary}</p>
            <Link href="/quote" className="btn-primary">Request a quote →</Link>
          </div>
        </Reveal>
        <div className="border-t border-line">
          {items.map((item, index) => <Reveal key={item.slug} delay={Math.min(index * 0.03, 0.18)}>
            <Link href={`/products/${item.slug}`} className="group grid grid-cols-[1fr_auto] gap-5 py-5 border-b border-line hover:bg-cream/70 transition-colors px-2 -mx-2">
              <span><strong className="font-display text-xl text-ink group-hover:text-amber-deep block mb-1">{item.name}</strong><small className="text-muted">{item.useCase}</small></span>
              <span className="text-muted group-hover:text-amber-deep">↗</span>
            </Link>
          </Reveal>)}
        </div>
      </section>

      <section className="border-t border-line pt-14 mb-20" aria-labelledby="buyer-questions">
        <p className="eyebrow text-amber-deep mb-4">Buyer questions</p>
        <h2 id="buyer-questions" className="font-display text-3xl md:text-4xl text-ink mb-10">Clear answers before you order.</h2>
        <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
          {page.questions.map(({ question, answer }) => <article key={question} className="bg-paper p-6 md:p-8"><h3 className="font-display text-xl text-ink mb-4">{question}</h3><p className="text-sm text-ink/65 leading-relaxed">{answer}</p></article>)}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-10 bg-ink text-cream p-8 md:p-12" aria-labelledby="category-contact">
        <div><p className="eyebrow text-amber-bright mb-4">Serving organisations across Nepal</p><h2 id="category-contact" className="font-display text-3xl mb-5">Tell us what you need.</h2><p className="text-cream/65 leading-relaxed">Common buyers include {page.industries.join(", ")}. Availability, pack size and delivery are confirmed with each quotation.</p></div>
        <div className="flex flex-col justify-center items-start md:items-end gap-3"><Link href="/quote" className="btn-primary">Request wholesale pricing →</Link><a href={whatsappLink(`Hi ESCU, I need information about ${page.category}.`)} className="btn-secondary-dark" target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a><Link href="/buying-guide" className="text-cream/65 text-sm underline underline-offset-4">Read the chemical buying guide</Link></div>
      </section>
    </div>
  </div>;
}
