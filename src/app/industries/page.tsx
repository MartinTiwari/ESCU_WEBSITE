import Link from "next/link";
import { industries, products } from "@/lib/products";

export const metadata = { title: "Industries We Serve | Everest Super Chemical Udhyog" };

export default function IndustriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-bold text-navy mb-2">Industries We Serve</h1>
      <p className="text-grey-400 mb-10 max-w-2xl">
        From hospitality to industrial water treatment, ESCU supplies the chemicals your
        operation depends on. Select your industry to see relevant products.
      </p>

      <div className="space-y-12">
        {industries.map((ind) => {
          const items = products.filter((p) => p.industries.includes(ind));
          if (items.length === 0) return null;
          return (
            <section key={ind} id={ind}>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-grey-100">
                <h2 className="text-xl font-bold text-navy">{ind}</h2>
                <span className="text-xs font-semibold text-grey-700 bg-grey-100 px-3 py-1 rounded-full">
                  {items.length} products
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((p) => (
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
