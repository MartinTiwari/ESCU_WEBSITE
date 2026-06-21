import Link from "next/link";
import { categories, products } from "@/lib/products";

export const metadata = { title: "Products | Everest Super Chemical Udhyog" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const filtered = category ? products.filter((p) => p.category === category) : products;

  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-bold text-navy mb-2">Product Catalogue</h1>
      <p className="text-grey-400 mb-8">
        {products.length} products across {categories.length} categories. Pricing is
        quote-based — request a quote for current rates and bulk discounts.
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/products"
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            !category ? "bg-navy text-white border-navy" : "border-grey-100 text-grey-700 hover:border-teal"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/products?category=${encodeURIComponent(c)}`}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              category === c ? "bg-navy text-white border-navy" : "border-grey-100 text-grey-700 hover:border-teal"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="bg-white border border-grey-100 rounded-lg p-5 hover:border-teal hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-navy text-sm mb-1">{p.name}</h3>
            <p className="text-grey-400 text-xs">{p.useCase}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
