import Link from "next/link";
import { categories, products } from "@/lib/products";
import { whatsappLink } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Chemical Products Catalogue | Water Treatment, Pool & Housekeeping",
  description: `Browse ${products.length}+ chemical products across water treatment, swimming pool, and housekeeping categories. Wholesale pricing and bulk supply for hotels, hospitals, and industries across Nepal.`,
  keywords: [
    "chemical products Nepal",
    "water treatment chemicals price Nepal",
    "swimming pool chemicals Nepal",
    "PAC powder Nepal",
    "liquid chlorine Nepal",
    "caustic soda flakes Nepal",
    "housekeeping chemicals Nepal",
  ],
  path: "/products",
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategories = category ? categories.filter((c) => c === category) : categories;

  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="Catalogue"
        title={<>Everything we supply, <span className="italic text-emerald-bright">in one place.</span></>}
        sub={`${products.length} products across ${categories.length} categories. Pricing is quote-based — ask us for current rates and bulk discounts.`}
      />

      {/* Filter tabs */}
      <div className="border-b border-line bg-cream sticky top-[72px] z-30">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center gap-1 overflow-x-auto py-1 -mb-px">
            <FilterTab href="/products" active={!category}>All</FilterTab>
            {categories.map((c) => (
              <FilterTab key={c} href={`/products?category=${encodeURIComponent(c)}`} active={category === c}>
                {c.replace(" Chemicals", "").replace(" & Cleaning", "")}
              </FilterTab>
            ))}
          </div>
        </div>
      </div>

      {/* Product index — grouped by category */}
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="space-y-20">
          {activeCategories.map((cat, ci) => {
            const items = products.filter((p) => p.category === cat);
            const offset = products.indexOf(items[0]);
            return (
              <Reveal key={cat}>
                <section>
                  {/* Category header */}
                  <div className="flex items-end justify-between gap-6 mb-2 pb-5 border-b-2 border-ink">
                    <div className="flex items-baseline gap-5">
                      <span className="eyebrow text-muted text-[0.58rem]">
                        {String(categories.indexOf(cat) + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-2xl md:text-3xl text-ink">{cat}</h2>
                    </div>
                    <span className="eyebrow text-muted text-[0.58rem] mb-1 shrink-0">
                      {items.length} {items.length === 1 ? "product" : "products"}
                    </span>
                  </div>

                  {/* Products as row list */}
                  <div>
                    {items.map((p, i) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_1fr_280px_40px] items-center gap-4 md:gap-8 py-4 border-b border-line hover:bg-cream/70 transition-colors -mx-2 px-2"
                      >
                        <span className="eyebrow text-muted text-[0.58rem]">
                          {String(offset + i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <span className="font-display text-lg md:text-xl text-ink group-hover:text-emerald transition-colors leading-tight block">
                            {p.name}
                          </span>
                        </div>
                        <span className="text-muted text-sm leading-snug hidden md:block">
                          {p.useCase}
                        </span>
                        <span className="text-muted group-hover:text-emerald group-hover:translate-x-0.5 transition-all text-right">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>

        {/* Callout */}
        <Reveal>
          <div className="mt-20 rounded-2xl bg-ink text-cream p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald/20 rounded-full blur-[90px]" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="eyebrow text-emerald-bright mb-4 flex items-center gap-3">
                  <span className="w-6 h-px bg-emerald-bright" />
                  Can&apos;t find it?
                </div>
                <h2 className="font-display text-2xl md:text-3xl mb-3">
                  We supply more than the catalogue.
                </h2>
                <p className="text-cream/55 leading-relaxed max-w-xl">
                  Machine oils, test kits, lab acids, cleaning equipment, and more. If it is
                  used in water treatment, hospitality, or industry, chances are we stock it
                  or can source it.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Link
                  href="/quote"
                  className="group inline-flex items-center justify-center gap-2 bg-emerald hover:bg-emerald-bright text-ink transition-all px-7 py-3.5 rounded-full font-semibold text-sm"
                >
                  Request a Quote →
                </Link>
                <a
                  href={whatsappLink("Hi ESCU, I'm looking for a product that may not be on your website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-cream/25 hover:border-cream/60 transition-all px-7 py-3.5 rounded-full font-semibold text-sm"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function FilterTab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`eyebrow text-[0.65rem] px-5 py-3.5 border-b-2 whitespace-nowrap transition-colors ${
        active
          ? "border-emerald text-emerald"
          : "border-transparent text-muted hover:text-ink hover:border-line"
      }`}
    >
      {children}
    </Link>
  );
}
