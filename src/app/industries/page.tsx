
import { industries, products } from "@/lib/products";
import { industryPhoto } from "@/lib/photos";

import PageHeader from "@/components/PageHeader";
import IndustryDirectory from "@/components/IndustryDirectory";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Serve | Hotels, Hospitals & Water Treatment Plants",
  description: "ESCU supplies chemicals to hotels, resorts, hospitals, restaurants, industrial plants, and water treatment facilities across Nepal, matched to each industry's needs.",
  keywords: [
    "chemical supplier hotels Nepal",
    "chemical supplier hospitals Nepal",
    "industrial chemical supply Nepal",
    "water treatment plant chemicals Nepal",
  ],
  path: "/industries",
});

export default function IndustriesPage() {
  const served = industries.filter((ind) => products.some((p) => p.industries.includes(ind)));

  return (
    <div className="bg-paper compact-directory">
      <PageHeader
        eyebrow="Applications"
        title={<>Built for the businesses <span className="italic text-amber-bright">that depend on us.</span></>}
        sub="From hotels to water treatment plants, ESCU supplies the chemicals your business needs. Jump to your industry to see the products."
      />

      <div className="max-w-6xl mx-auto px-5 py-10">
        <p className="directory-hint">Choose an industry to see its products.</p>
        <IndustryDirectory groups={served.map((name) => ({
          name,
          photo: industryPhoto[name],
          products: products.filter((p) => p.industries.includes(name)).map(({ slug, name, useCase }) => ({ slug, name, useCase })),
        }))} />
      </div>    </div>
  );
}
