import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import Reveal from "@/components/Reveal";
import CategoryIcon from "@/components/CategoryIcon";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.name} in Nepal | ${product.useCase}`,
    description: `${product.description} Wholesale supply of ${product.name.toLowerCase()} across Nepal for ${product.industries.join(", ").toLowerCase()}. Contact ${site.shortName} for pricing and bulk orders.`,
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

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  // cross-category: other products that serve at least one of the same
  // industries but come from a different category — this is where the
  // "one supplier, three categories" pitch actually gets to prove itself
  const relatedSlugs = new Set(related.map((p) => p.slug));
  const crossCategory = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.category !== product.category &&
        !relatedSlugs.has(p.slug) &&
        p.industries.some((ind) => product.industries.includes(ind))
    )
    .slice(0, 4);

  const url = `${site.url}/products/${product.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    alternateName: product.alsoKnownAs,
    description: `${product.description} ${product.overview}`,
    category: product.category,
    sku: product.slug,
    url,
    image: `${site.url}/logo-mark.png`,
    brand: { "@type": "Organization", name: site.name },
    audience: product.industries.map((ind) => ({ "@type": "Audience", audienceType: ind })),
    // No `offers` block on purpose. We quote on request rather than publish
    // prices, and Search Console flagged the priceless Offer as a critical
    // error ("Either 'price' or 'priceSpecification.price' should be
    // specified") on every product page. Nothing is lost by dropping it:
    // product rich results need a price or a review to appear at all, so an
    // invalid Offer bought an error and no eligibility. Restore this — with a
    // real price — if list pricing is ever published.
    manufacturer: { "@type": "Organization", name: site.name },
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
        item: `${site.url}/products?category=${encodeURIComponent(product.category)}`,
      },
      { "@type": "ListItem", position: 4, name: product.name, item: url },
    ],
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
      {/* Header */}
      <div className="bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 grid-blueprint opacity-30" aria-hidden />
        <div className="max-w-4xl mx-auto px-5 pt-28 pb-14 md:pt-32 md:pb-18 relative">
          <Link href="/products" className="eyebrow text-cream/40 hover:text-amber-bright transition-colors">
            ← Back to catalogue
          </Link>
          <Reveal>
            <div className="mt-8">
              <div className="eyebrow text-amber-bright mb-5 flex items-center gap-3">
                <CategoryIcon category={product.category} className="w-4 h-4" />
                {product.category}
              </div>
              <h1 className="font-display font-medium text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] mb-5">
                {product.name}
              </h1>
              <p className="text-cream/55 text-lg max-w-xl">{product.useCase}</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-[1fr_260px] gap-12 md:gap-16 items-start">
          <Reveal>
            <div>
              <div className="eyebrow text-amber-deep mb-4">About this product</div>
              <p className="text-ink/70 text-lg leading-relaxed mb-6">{product.description}</p>
              <p className="text-ink/70 leading-relaxed mb-10">{product.overview}</p>

              <div className="eyebrow text-muted mb-4">Common applications</div>
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

              <div className="eyebrow text-muted mb-4">Storage &amp; handling</div>
              <p className="text-ink/70 text-sm leading-relaxed mb-10">{product.handling}</p>

              <div className="eyebrow text-muted mb-4">Also known as</div>
              <p className="text-ink/60 text-sm leading-relaxed mb-12">
                {product.name} is also sold and searched for as {formatList(product.alsoKnownAs)}.
              </p>

              <div className="eyebrow text-muted mb-4">Suited for</div>
              <div className="flex flex-wrap gap-2 mb-12">
                {product.industries.map((ind) => (
                  <Link
                    key={ind}
                    href={`/industries#${encodeURIComponent(ind)}`}
                    className="bg-paper-2 text-ink/70 text-xs font-medium px-4 py-2 border border-line hover:border-amber hover:text-amber-deep transition-colors"
                  >
                    {ind}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={`/quote?product=${encodeURIComponent(product.name)}`} className="group btn-primary">
                  Get a Quote
                  <span className="transition-transform group-hover:translate-x-1">→</span>
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
              have per-product technical specs (purity, dosage, packaging)
              digitized yet, and a card promising specs with none would
              undercut trust right where it matters most. This only states
              what's actually true today. */}
          <Reveal delay={0.1}>
            <aside className="bg-cream border border-line rounded-md p-7 sticky top-28">
              <div className="eyebrow text-amber-deep mb-5">Ordering info</div>
              <dl className="space-y-4">
                <SpecRow k="Pricing" v="Ask us for a price" />
                <SpecRow k="Delivery" v="Nepal-wide" />
                {product.sdsAvailable && product.sdsUrl ? (
                  <div className="flex justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
                    <dt className="text-muted text-sm shrink-0">SDS</dt>
                    <dd className="text-sm text-right">
                      <a href={product.sdsUrl} target="_blank" rel="noopener noreferrer" className="text-amber-deep font-medium link-ul">
                        Download →
                      </a>
                    </dd>
                  </div>
                ) : (
                  <SpecRow k="SDS" v="On request" />
                )}
              </dl>
              {!(product.sdsAvailable && product.sdsUrl) && (
                <p className="text-muted text-xs leading-relaxed mt-6 pt-5 border-t border-line">
                  SDS / spec sheet not yet online. Request one via the quote form or WhatsApp and we will send it over.
                </p>
              )}
            </aside>
          </Reveal>
        </div>

        {/* Related products, same category */}
        {related.length > 0 && (
          <div className="mt-20 pt-14 border-t border-line">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 mb-10">
                <div>
                  <div className="eyebrow text-amber-deep mb-2">In the same category</div>
                  <h2 className="font-display text-2xl md:text-3xl text-ink">Related products</h2>
                </div>
                <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="text-muted text-sm hover:text-ink link-ul shrink-0">
                  View all →
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
                    <span className="text-muted group-hover:text-amber-deep group-hover:translate-x-0.5 transition-all">→</span>
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
                    <span className="text-muted group-hover:text-amber-deep group-hover:translate-x-0.5 transition-all">→</span>
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
