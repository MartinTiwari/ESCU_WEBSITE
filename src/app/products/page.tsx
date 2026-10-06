import Link from "next/link";
import { categories, industries, products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import CatalogueSearch from "@/components/CatalogueSearch";
import IndustryFilter from "@/components/IndustryFilter";
import { pageMetadata } from "@/lib/seo";
import { getCategoryUrl } from "@/lib/category-pages";

const catalogueMetadata = pageMetadata({
  title: "Chemical Products in Nepal",
  description: `Browse ${products.length} water treatment, pool and cleaning products from ESCU in Kathmandu. Request wholesale pricing and bulk chemical supply across Nepal.`,
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

const categoryDescriptions: Record<string, string> = {
  "Housekeeping & Cleaning Chemicals": "Liquid soap, hand wash, floor cleaner and cleaning supplies for hotels, restaurants and commercial buildings. Wholesale supply from Kathmandu across Nepal.",
  "Swimming Pool Chemicals": "Source TCCA, liquid chlorine, copper sulphate, soda ash and sodium bicarbonate for swimming pools. Ask ESCU in Kathmandu for bulk pricing and delivery in Nepal.",
  "Water Treatment Chemicals": "Water treatment chemicals in Nepal: PAC, alum, industrial salt, caustic soda, antiscalant and more. Bulk supply from Kathmandu for treatment plants and industry.",
};

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string; industry?: string }> }) {
  const { category: requestedCategory, industry: requestedIndustry } = await searchParams;
  const category = categories.find((value) => value === requestedCategory);
  const industry = industries.find((value) => value === requestedIndustry);
  if (!category || industry) return catalogueMetadata;
  return pageMetadata({
    title: `${category} in Nepal`,
    description: categoryDescriptions[category],
    path: getCategoryUrl(category),
  });
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; industry?: string }>;
}) {
  const { category: requestedCategory, industry: requestedIndustry } = await searchParams;
  const industry = industries.find((value) => value === requestedIndustry);
  const category = categories.find((value) => value === requestedCategory);
  const activeCategories = category ? categories.filter((c) => c === category) : categories;
  const visibleProducts = products.filter((product) => activeCategories.includes(product.category) && (!industry || product.industries.includes(industry)));

  // Names the full catalogue as an ordered list in one place. The product
  // links are already in the markup; this states outright that they are a
  // catalogue rather than leaving Google to infer it from the link graph.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} ${category || "product catalogue"}`,
    numberOfItems: visibleProducts.length,
    itemListElement: visibleProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${site.url}/products/${p.slug}`,
    })),
  };

  return (
    <div className="bg-paper compact-directory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <PageHeader
        eyebrow="Catalogue"
        title={category ? <>{category} <span className="text-amber-bright">in Nepal.</span></> : <>Everything we supply, <span className="italic text-amber-bright">in one place.</span></>}
        sub={category ? categoryDescriptions[category] : `${products.length} products in ${categories.length} categories. Wholesale chemical supply from Kathmandu across Nepal. Ask us for current prices and bulk discounts.`}
      />

      {/* Filter tabs */}
      <div className="border-b border-line bg-cream sticky top-[68px] z-30">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center gap-1 overflow-x-auto py-1 -mb-px">
            <FilterTab href={industry ? `/products?industry=${encodeURIComponent(industry)}` : "/products"} active={!category}>All</FilterTab>
            {categories.map((c) => (
              <FilterTab key={c} href={industry ? `/products?category=${encodeURIComponent(c)}&industry=${encodeURIComponent(industry)}` : getCategoryUrl(c)} active={category === c}>
                {c.replace(" Chemicals", "").replace(" & Cleaning", "")}
              </FilterTab>
            ))}
          </div>
        </div>
      </div>

      {/* Product index — grouped by category */}
      <div className="max-w-6xl mx-auto px-5 py-10">
        {industry && (
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <p className="text-ink">Products for <strong>{industry}</strong></p>
            <Link href={category ? `/products?category=${encodeURIComponent(category)}` : "/products"} className="text-amber-deep underline underline-offset-4">View all industries</Link>
          </div>
        )}
        <CatalogueSearch
          industryFilter={<IndustryFilter industries={industries.filter((value) => products.some((product) => product.industries.includes(value)))} selected={industry} category={category} />}
          key={`${category || "all"}-${industry || "all"}`}
          products={visibleProducts.map(({ slug, name, useCase, category, alsoKnownAs }) => ({ slug, name, useCase, category, alsoKnownAs }))}
          categories={activeCategories}
        />
        {/* Callout */}
        <Reveal>
          <div className="mt-10 bg-ink text-cream p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 grid-blueprint opacity-25" aria-hidden />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="eyebrow text-amber-bright mb-4 flex items-center gap-3">
                  <span className="w-6 h-px bg-amber-bright" />
                  Can&apos;t find it?
                </div>
                <h2 className="font-display text-xl md:text-2xl mb-3">
                  We supply more than the catalogue.
                </h2>
                <p className="text-cream/55 leading-relaxed max-w-xl">
                  Machine oils, test kits, lab acids, cleaning equipment, and more. If it&apos;s
                  used in water treatment, hotels, or industry, chances are we stock it or
                  can get it for you.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Link href="/quote" className="group btn-primary justify-center">
                  Request a Quote →
                </Link>
                <a
                  href={whatsappLink("Hi ESCU, I'm looking for a product that may not be on your website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-dark justify-center"
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
      aria-current={active ? "page" : undefined}
      className={`eyebrow px-5 py-3.5 border-b-2 whitespace-nowrap transition-colors ${
        active
          ? "border-amber text-amber-deep"
          : "border-transparent text-muted hover:text-ink hover:border-line"
      }`}
    >
      {children}
    </Link>
  );
}
