import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { photos } from "@/lib/photos";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us | Chemical Supplier in Kathmandu, Nepal",
  description: `${site.name} (ESCU) has supplied water treatment, swimming pool, and housekeeping chemicals to hotels, hospitals, and industries across Nepal for ${site.yearsInOperation}+ years. Wholesale pricing, technical support, nationwide delivery.`,
  keywords: [
    "chemical company Nepal",
    "chemical supplier Kathmandu",
    "industrial chemical distributor Nepal",
    "about Everest Super Chemical Udhyog",
  ],
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow={`${site.yearsInOperation}+ Years · Kathmandu`}
        title={<>Over {site.yearsInOperation} years of <span className="italic text-amber-bright">keeping Nepal supplied.</span></>}
        bgImage={photos.aboutHeaderBg}
      />

      <div className="max-w-5xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-start mb-20">
          <Reveal>
            <div className="space-y-5 text-fg text-lg leading-relaxed">
              <p>
                <span className="font-display text-2xl text-ink">Everest Super Chemical Udhyog (ESCU)</span> is
                based in Kathmandu. We make and supply water treatment chemicals, pool products,
                cleaning products, and cooking fuel, for hotels, resorts, hospitals, and other
                businesses across Nepal.
              </p>
              <p>
                We make some of what we sell ourselves, and import the rest directly. This means
                we control the quality you get, instead of just passing on whatever a middleman
                happens to have. It&apos;s also why our bulk prices stay steady from order to order.
              </p>
              <p>
                With {site.yearsInOperation}+ years in the business, we&apos;ve built long-term
                relationships with hotels, resorts, and engineering projects across the country.
                We back that up with wholesale prices, expert support, and reliable delivery
                everywhere in Nepal.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-ink text-cream p-8 grid grid-cols-2 gap-6 relative overflow-hidden">
              <div className="absolute inset-0 grid-blueprint opacity-20" aria-hidden />
              <PullStat value={`${site.yearsInOperation}+`} label="Years in the trade" />
              <PullStat value="Countless" label="Deliveries made" />
              <PullStat value="8" label="Industries served" />
              <PullStat value="Nepal-wide" label="Delivery reach" />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="border-t-2 border-ink pt-6 mb-20 max-w-2xl">
            <p className="font-display text-2xl md:text-[1.75rem] leading-snug text-ink">
              Direct line to the warehouse. Whoever answers the phone packed
              an order this morning, not a call centre reading from a script.
            </p>
            <div className="eyebrow text-muted mt-5">The ESCU team &middot; Banshidhar Marg</div>
          </div>
        </Reveal>

        <Reveal>
          <div className="eyebrow text-amber-deep mb-3">01 / What you get</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">Why choose us</h2>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 mb-20 items-stretch">
          <div className="grid sm:grid-cols-2 border-t border-l border-line">
            {site.whyChooseUs.map((item, i) => (
              <Reveal key={item} delay={Math.min(i * 0.04, 0.3)}>
                <div className="flex items-start gap-3.5 border-b border-r border-line px-6 py-5 h-full">
                  <span className="w-5 h-5 notch-sm bg-amber/12 text-amber-deep grid place-items-center mt-0.5 shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3 h-3">
                      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-ink">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="relative rounded-md overflow-hidden h-full min-h-64 frame-ticks text-cream">
              <Image
                src={photos.labQuality}
                alt="Quality control on a batch before dispatch"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/0 to-ink/0" />
              <span className="eyebrow absolute bottom-4 left-5 text-cream/85">
                Every batch checked before it ships
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="bg-ink text-cream p-10 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 grid-blueprint opacity-25" aria-hidden />
            <div className="relative max-w-xl">
              <div className="eyebrow text-amber-bright mb-4">Get in touch</div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">Let&apos;s set up your supply.</h2>
              <p className="text-cream/60 leading-relaxed mb-7">
                Tell us what your business needs and we&apos;ll recommend the right chemicals,
                give you a fair price, and keep you stocked. Custom supply plans and long-term
                deals welcome.
              </p>
              <Link href="/quote" className="group btn-primary">
                Get a Quote
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function PullStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative">
      <div className="font-display text-3xl text-amber-bright mb-1">{value}</div>
      <div className="eyebrow text-cream/40">{label}</div>
    </div>
  );
}
