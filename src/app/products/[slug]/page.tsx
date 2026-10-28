import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { getCategoryUrl } from "@/lib/category-pages";
import { getProductBuyingContent } from "@/lib/product-buying-content";
import { getProductEditorial } from "@/lib/product-editorial";
import { guides } from "@/lib/guides";
import { getProductPackaging } from "@/lib/product-packaging";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const buyingContent = getProductBuyingContent(slug);
  return pageMetadata({
    title: buyingContent?.title ?? `${product.name} Supplier in Nepal`,
    description: buyingContent?.description ?? `${product.name} for ${product.useCase.toLowerCase()}. Request wholesale pricing from ESCU in Kathmandu, with bulk delivery across Nepal.`,
    keywords: [
      `${product.name} Nepal`,
      `${product.name} price Nepal`,
      `${product.name} supplier Kathmandu`,
      // Buyers search by chemical and trade name at least as often as by the
      // name we happen to list a product under.
      ...product.alsoKnownAs.flatMap((alias) => [alias, `${alias} Nepal`, `${alias} supplier Nepal`]),
      product.category,
      product.useCase,
    ],
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const buyingContent = getProductBuyingContent(slug);

  const editorial = getProductEditorial(slug);
  const packaging = getProductPackaging(slug);
  const recommendations = editorial.relatedSlugs.map(getProductBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p && p.slug !== product.slug));
  const related = recommendations.filter((p) => p.category === product.category);
  const crossCategory = recommendations.filter((p) => p.category !== product.category);
  const relatedGuides = guides.filter((guide) => guide.productSlugs.includes(product.slug)).slice(0, 3);

  const url = `${site.url}/products/${product.slug}`;

  // Semantic product identity only: quotation-based supply has no public offer
  // or product review. This does not claim Google product-rich-result eligibility.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    name: `${product.name} Supplier in Nepal`,
    description: `${product.description} ${product.overview}`,
    url,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "Product",
      "@id": `${url}/#product`,
      name: product.name,
      url,
      category: product.category,
      alternateName: product.alsoKnownAs,
      description: `${product.description} Pack sizes: ${packaging.label}.${packaging.smallerQuantities ? " Smaller quantities are available on request." : ""}`,
    },
  };

  // Gives Google the catalogue → category → product hierarchy explicitly,
  // rather than leaving it to infer structure from URL shape alone.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `${site.url}${getCategoryUrl(product.category)}`,
      },
      { "@type": "ListItem", position: 4, name: product.name, item: url },
    ],
  };
  const faqJsonLd = buyingContent && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}/#buying-questions`,
    mainEntity: buyingContent.questions.map(({ question, answer }) => ({
      "@type": "Question", name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />}
      {/* Header */}
      <PageHeader eyebrow={product.category} title={product.name} sub={product.useCase}>
        <Link href="/products" className="site-back-link">← Back to catalogue</Link>
      </PageHeader>
      {/* Body */}
      <div className="max-w-4xl mx-auto px-5 py-14">
        <Breadcrumbs items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: product.category, href: getCategoryUrl(product.category) },
          { name: product.name },
        ]} />
        <div className="grid md:grid-cols-[1fr_260px] gap-12 md:gap-16 items-start">
          <Reveal>
            <div>
              <h2 className="eyebrow text-amber-deep mb-4">About this product</h2>
              <p className="text-ink/70 text-lg leading-relaxed mb-6">{product.description}</p>
              <p className="text-ink/70 leading-relaxed mb-10">{product.overview}</p>

              <section aria-labelledby="ordering-checklist" className="mb-10">
                <h2 id="ordering-checklist" className="eyebrow text-muted mb-4">Before you order</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-ink/70">
                  {editorial.buyingChecklist.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <h3 className="font-semibold text-ink mt-5 mb-2">Packaging and specifications</h3>
                <p className="text-sm leading-relaxed text-ink/70">{editorial.packagingNote}</p>
                <h3 className="font-semibold text-ink mt-5 mb-2">Usage and suitability</h3>
                <p className="text-sm leading-relaxed text-ink/70">{editorial.usageNote}</p>
                <h3 className="font-semibold text-ink mt-5 mb-2">Delivery and collection</h3>
                <p className="text-sm leading-relaxed text-ink/70">{editorial.deliveryNote}</p>
              </section>

              <h2 className="eyebrow text-muted mb-4">Common applications</h2>
              <ul className="mb-10 border-t border-line">
                {product.applications.map((use) => (
                  <li
                    key={use}
                    className="text-ink/70 text-sm leading-relaxed py-3 border-b border-line flex gap-3"
                  >
                    <span className="text-amber-deep shrink-0" aria-hidden>
                      —
                    </span>
                    {use}
                  </li>
                ))}
              </ul>

              <h2 className="eyebrow text-muted mb-4">Storage &amp; handling</h2>
              <p className="text-ink/70 text-sm leading-relaxed mb-4">For pricing, pack sizes and delivery questions, read our <Link href="/buying-guide" className="underline underline-offset-4 hover:text-amber-deep">chemical buying guide</Link>. Confirm the specifications for {product.name} with the team before ordering.</p>
              <p className="text-ink/70 text-sm leading-relaxed mb-10">{product.handling}</p>

              <h2 className="eyebrow text-muted mb-4">Also known as</h2>
              <p className="text-ink/60 text-sm leading-relaxed mb-12">
                {product.name} is also sold and searched for as {formatList(product.alsoKnownAs)}.
                {buyingContent?.nepaliName && (
                  <> Nepali name: <span lang="ne">{buyingContent.nepaliName}</span>.</>
                )}
              </p>

              {buyingContent && (
                <section className="mb-12" aria-labelledby="buying-questions">
                  <h2 id="buying-questions" className="eyebrow text-muted mb-4">Buying questions</h2>
                  <div className="border-t border-line">
                    {buyingContent.questions.map(({ question, answer }) => (
                      <details key={question} className="border-b border-line py-4">
                        <summary className="cursor-pointer text-ink text-sm font-medium leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-deep">
                          {question}
                        </summary>
                        <p className="text-ink/70 text-sm leading-relaxed mt-3">{answer}</p>
                      </details>
                    ))}
                  </div>
                  <p className="text-ink/70 text-sm leading-relaxed mt-4">
                    Buy from ESCU at {site.streetAddress}, Kathmandu. <Link href={`/quote?product=${encodeURIComponent(product.name)}`} className="underline underline-offset-4 hover:text-amber-deep">Request a quotation</Link> to confirm availability and delivery, or read the <Link href="/buying-guide" className="underline underline-offset-4 hover:text-amber-deep">chemical buying guide</Link> for ordering details.
                  </p>
                </section>
              )}

              <div className="eyebrow text-muted mb-4">Suited for</div>
              <div className="flex flex-wrap gap-2 mb-12">
                {product.industries.map((ind) => (
                  <Link
                    key={ind}
                    href={`/products?industry=${encodeURIComponent(ind)}#industry-filter`}
                    className="bg-paper-2 text-ink/70 text-xs font-medium px-4 py-2 border border-line hover:border-amber hover:text-amber-deep transition-colors"
                  >
                    {ind}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={`/quote?product=${encodeURIComponent(product.name)}`} className="group btn-primary">
                  Get a Quote

                </Link>
                <a
                  href={whatsappLink(`Hi ESCU, I'd like pricing for ${product.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          {/* Ordering info — deliberately not called "Spec sheet": we don't
              have per-product technical specs (purity, dosage)
              digitized yet, and a card promising specs with none would
              undercut trust right where it matters most. This only states
              what's actually true today. */}
          <Reveal delay={0.1}>
            <aside className="bg-cream border border-line rounded-md p-7 sticky top-28">
              <div className="eyebrow text-amber-deep mb-5">Ordering info</div>
              <dl className="space-y-4">
                <SpecRow k="Pack sizes" v={packaging.label} />
                {packaging.smallerQuantities && <SpecRow k="Smaller quantities" v="Available on request" />}
                <SpecRow k="Pricing" v="Ask us for a price" />
                <SpecRow k="Delivery" v="Nepal-wide" />
                {product.sdsAvailable && product.sdsUrl ? (
                  <div className="flex justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
                    <dt className="text-muted text-sm shrink-0">SDS</dt>
                    <dd className="text-sm text-right">
                      <a href={product.sdsUrl} target="_blank" rel="noopener noreferrer" className="text-amber-deep font-medium link-ul">
                        Download
                      </a>
                    </dd>
                  </div>
                ) : (
                  <SpecRow k="SDS & documents" v="After enquiry" />
                )}
              </dl>
              {!(product.sdsAvailable && product.sdsUrl) && (
                <p className="text-muted text-xs leading-relaxed mt-6 pt-5 border-t border-line">
                  SDS and related product documents are provided after your enquiry. Send the product name and intended use via the quote form or WhatsApp so our team can share the relevant documents for your order.
                </p>
              )}
            </aside>
          </Reveal>
        </div>

        {relatedGuides.length > 0 && <section className="mt-12 border-t border-line pt-7" aria-labelledby="product-guides">
          <h2 id="product-guides" className="font-display text-2xl text-ink mb-4">Help with your next order</h2>
          <div className="grid gap-4 sm:grid-cols-2">{relatedGuides.map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="text-ink underline underline-offset-4 hover:text-amber-deep">{guide.title}</Link>)}</div>
        </section>}

        {/* Related products, same category */}
        {related.length > 0 && (
          <div className="mt-20 pt-14 border-t border-line">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 mb-10">
                <div>
                  <div className="eyebrow text-amber-deep mb-2">In the same category</div>
                  <h2 className="font-display text-2xl md:text-3xl text-ink">Related products</h2>
                </div>
                <Link href={getCategoryUrl(product.category)} className="text-muted text-sm hover:text-ink link-ul shrink-0">
                  View all
                </Link>
              </div>
            </Reveal>
            <div className="border-t border-line">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group grid grid-cols-[1fr_auto] gap-4 items-center py-5 border-b border-line hover:bg-cream/70 transition-colors -mx-2 px-2"
                  >
                    <div>
                      <span className="font-display text-xl text-ink group-hover:text-amber-deep transition-colors block mb-0.5">
                        {p.name}
                      </span>
                      <span className="text-muted text-sm">{p.useCase}</span>
                    </div>

                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Cross-category — the "one supplier, three categories" pitch,
            proved at the exact moment someone's already decided to buy */}
        {crossCategory.length > 0 && (
          <div className="mt-16 pt-14 border-t border-line">
            <Reveal>
              <div className="eyebrow text-amber-deep mb-2">Also for your operation</div>
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-2">From our other categories</h2>
              <p className="text-muted text-sm mb-10 max-w-xl">
                Since you&apos;re stocking up, here&apos;s what else we supply for the same kind of operation.
              </p>
            </Reveal>
            <div className="border-t border-line">
              {crossCategory.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] gap-4 items-center py-5 border-b border-line hover:bg-cream/70 transition-colors -mx-2 px-2"
                  >
                    <span className="eyebrow text-muted text-[0.6rem] shrink-0">{p.category.replace(" Chemicals", "").replace(" & Cleaning", "")}</span>
                    <div className="min-w-0">
                      <span className="font-display text-xl text-ink group-hover:text-amber-deep transition-colors block mb-0.5">
                        {p.name}
                      </span>
                      <span className="text-muted text-sm">{p.useCase}</span>
                    </div>

                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// "a, b and c" — reads as prose rather than a comma-spliced keyword list.
function formatList(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
      <dt className="text-muted text-sm shrink-0">{k}</dt>
      <dd className="text-ink font-medium text-sm text-right">{v}</dd>
    </div>
  );
}
