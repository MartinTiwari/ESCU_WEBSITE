import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: `${product.name} | Everest Super Chemical Udhyog` };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="bg-paper">
      {/* Header */}
      <div className="bg-ink text-cream relative overflow-hidden">
        <div className="absolute -right-32 -top-24 w-[420px] h-[420px] bg-emerald/12 rounded-full blur-[110px]" />
        <div className="max-w-4xl mx-auto px-5 pt-28 pb-14 md:pt-32 md:pb-18 relative">
          <Link href="/products" className="eyebrow text-cream/40 hover:text-emerald-bright transition-colors text-[0.65rem]">
            ← Back to catalogue
          </Link>
          <Reveal>
            <div className="mt-8">
              <div className="eyebrow text-amber mb-5 flex items-center gap-3">
                <span className="w-6 h-px bg-amber" />
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
              <div className="eyebrow text-emerald mb-4">About this product</div>
              <p className="text-ink/70 text-lg leading-relaxed mb-10">{product.description}</p>

              <div className="eyebrow text-muted mb-4">Suited for</div>
              <div className="flex flex-wrap gap-2 mb-12">
                {product.industries.map((ind) => (
                  <Link
                    key={ind}
                    href={`/industries#${encodeURIComponent(ind)}`}
                    className="bg-paper-2 text-ink/70 text-xs font-medium px-4 py-2 rounded-full border border-line hover:border-emerald hover:text-emerald transition-colors"
                  >
                    {ind}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/quote?product=${encodeURIComponent(product.name)}`}
                  className="group inline-flex items-center gap-2 bg-emerald hover:bg-emerald-bright text-ink transition-all px-7 py-3.5 rounded-full font-semibold text-sm"
                >
                  Get a Quote
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <a
                  href={whatsappLink(`Hi ESCU, I'd like pricing for ${product.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line hover:border-emerald transition-all px-7 py-3.5 rounded-full font-semibold text-sm text-ink"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          {/* Spec card */}
          <Reveal delay={0.1}>
            <aside className="bg-cream border border-line rounded-2xl p-7 sticky top-28">
              <div className="eyebrow text-emerald mb-5">Spec sheet</div>
              <dl className="space-y-4">
                <SpecRow k="Category" v={product.category} />
                <SpecRow k="Use case" v={product.useCase} />
                <SpecRow k="Pricing" v="Quote-based" />
                <SpecRow k="SDS" v={product.sdsAvailable ? "Available" : "On request"} />
              </dl>
              {!product.sdsAvailable && (
                <p className="text-muted text-xs leading-relaxed mt-6 pt-5 border-t border-line">
                  SDS / spec sheet not yet online. Request one via the quote form or WhatsApp and we will send it over.
                </p>
              )}
            </aside>
          </Reveal>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 pt-14 border-t border-line">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 mb-10">
                <div>
                  <div className="eyebrow text-emerald mb-2">In the same category</div>
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
                      <span className="font-display text-xl text-ink group-hover:text-emerald transition-colors block mb-0.5">
                        {p.name}
                      </span>
                      <span className="text-muted text-sm">{p.useCase}</span>
                    </div>
                    <span className="text-muted group-hover:text-emerald group-hover:translate-x-0.5 transition-all">→</span>
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

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
      <dt className="text-muted text-sm shrink-0">{k}</dt>
      <dd className="text-ink font-medium text-sm text-right">{v}</dd>
    </div>
  );
}
