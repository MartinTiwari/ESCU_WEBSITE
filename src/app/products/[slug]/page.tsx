import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

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

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <Link href="/products" className="text-teal text-sm font-semibold hover:underline">
        ← Back to all products
      </Link>

      <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-6 items-start">
        <div>
          <div className="text-xs uppercase tracking-wider text-teal-light font-semibold mb-2">
            {product.category}
          </div>
          <h1 className="text-3xl font-bold text-navy mb-2">{product.name}</h1>
          <p className="text-grey-400 mb-6">{product.useCase}</p>
          <p className="text-foreground leading-relaxed mb-8">{product.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {product.industries.map((ind) => (
              <span key={ind} className="bg-grey-50 text-grey-700 text-xs font-medium px-3 py-1.5 rounded-full">
                {ind}
              </span>
            ))}
          </div>

          {!product.sdsAvailable && (
            <p className="text-grey-400 text-sm mb-6">
              SDS / spec sheet for this product is not yet available online — request one
              directly via the quote form or WhatsApp.
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/quote?product=${encodeURIComponent(product.name)}`}
              className="bg-teal hover:bg-teal-light transition-colors text-white px-6 py-3 rounded-md font-semibold text-sm"
            >
              Request a Quote
            </Link>
            <a
              href={whatsappLink(`Hi ESCU, I'd like pricing for ${product.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-grey-100 hover:border-teal transition-colors px-6 py-3 rounded-md font-semibold text-sm text-navy"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-navy mb-5">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="bg-white border border-grey-100 rounded-lg p-4 hover:border-teal hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-navy text-sm mb-1">{p.name}</h3>
                <p className="text-grey-400 text-xs">{p.useCase}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
