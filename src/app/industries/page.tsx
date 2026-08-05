import Image from "next/image";
import { industries, products } from "@/lib/products";
import { photos, industryPhoto } from "@/lib/photos";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
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
    <div className="bg-paper">
      <PageHeader
        eyebrow="Applications"
        title={<>Built for the businesses <span className="italic text-amber-bright">that depend on us.</span></>}
        sub="From hotels to water treatment plants, ESCU supplies the chemicals your business needs. Jump to your industry to see the products."
        bgImage={photos.hero}
      >
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8">
          {served.map((ind, i) => (
            <a key={ind} href={`#${encodeURIComponent(ind)}`} className="eyebrow text-cream/45 hover:text-amber-bright transition-colors">
              {String(i + 1).padStart(2, "0")} {ind}
            </a>
          ))}
        </div>
      </PageHeader>

      <div className="max-w-6xl mx-auto px-5 py-16 space-y-20">
        {served.map((ind, idx) => {
          const items = products.filter((p) => p.industries.includes(ind));
          return (
            <section key={ind} id={ind} className="scroll-mt-24">
              <Reveal>
                <div className="flex items-end justify-between gap-6 mb-8 pb-4 border-b border-line">
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={industryPhoto[ind]}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="eyebrow text-amber-deep mb-2">{String(idx + 1).padStart(2, "0")} / Industry</div>
                      <h2 className="font-display text-3xl md:text-4xl text-ink">{ind}</h2>
                    </div>
                  </div>
                  <span className="eyebrow text-muted whitespace-nowrap">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </span>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((p, i) => (
                  <Reveal key={p.slug} delay={Math.min(i * 0.04, 0.3)}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
