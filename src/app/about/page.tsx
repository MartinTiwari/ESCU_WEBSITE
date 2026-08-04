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
        eyebrow="35+ Years · Kathmandu"
        title={<>Three and a half decades of <span className="italic text-emerald-bright">keeping Nepal supplied.</span></>}
        bgImage={photos.aboutHeaderBg}
      />

      <div className="max-w-5xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-start mb-20">
          <Reveal>
            <div className="space-y-5 text-fg text-lg leading-relaxed">
              <p>
                <span className="font-display text-2xl text-ink">Everest Super Chemical Udhyog (ESCU)</span> is
                a Kathmandu-based manufacturer and supplier of water treatment chemicals, swimming
                pool solutions, housekeeping products, and catering fuel, serving hotels, resorts,
                hospitals, and industries across Nepal.
              </p>
              <p>
                Part of what we sell we make ourselves. The rest we import directly. That means
                we control the grade you receive rather than passing along whatever a middleman
                had in stock, and it is why we can quote on bulk without the price drifting
                between orders.
              </p>
              <p>
                With {site.yearsInOperation}+ years in the trade, we&apos;ve built long-term supply
                relationships with hotels, resorts, and engineering projects nationwide, backed by
                wholesale pricing, technical support, and reliable delivery to every corner of the
                country.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-ink text-cream rounded-xl p-8 grid grid-cols-2 gap-6">
              <PullStat value={`${site.yearsInOperation}+`} label="Years in the trade" />
              <PullStat value="Countless" label="Deliveries made" />
              <PullStat value="8" label="Industries served" />
              <PullStat value="Nepal-wide" label="Delivery reach" />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <blockquote className="relative border-l-2 border-emerald pl-7 md:pl-9 py-1 mb-20 max-w-2xl">
            <span className="absolute -left-[22px] md:-left-[26px] -top-3 font-display text-6xl md:text-7xl text-emerald/25 select-none" aria-hidden>
              &ldquo;
            </span>
            <p className="font-display italic text-2xl md:text-[1.75rem] leading-snug text-ink/85">
              We still pick up the phone ourselves. If you call ESCU, you are talking to
              someone who knows the difference between PAC and alum without looking it up.
            </p>
            <footer className="eyebrow text-muted text-[0.6rem] mt-5">— The ESCU team, Banshidhar Marg</footer>
          </blockquote>
        </Reveal>

        <Reveal>
          <div className="eyebrow text-emerald mb-3">01 / What you get</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">Why choose us</h2>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 mb-20 items-stretch">
          <div className="grid sm:grid-cols-2 border-t border-l border-line">
            {site.whyChooseUs.map((item, i) => (
              <Reveal key={item} delay={Math.min(i * 0.04, 0.3)}>
                <div className="flex items-start gap-3.5 border-b border-r border-line px-6 py-5 h-full">
                  <span className="w-5 h-5 rounded-full bg-emerald/12 text-emerald grid place-items-center mt-0.5 shrink-0">
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
            <div className="relative rounded-2xl overflow-hidden h-full min-h-64">
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
          <div className="bg-ink text-cream rounded-2xl p-10 md:p-12 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-emerald/20 rounded-full blur-[90px]" />
            <div className="relative max-w-xl">
              <div className="eyebrow text-emerald-bright mb-4">Get in touch</div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">Let&apos;s set up your supply.</h2>
              <p className="text-cream/60 leading-relaxed mb-7">
                Tell us what you&apos;re running and we&apos;ll recommend the right chemicals, quote a
                fair price, and keep you stocked, with customised supply and long-term agreements welcome.
              </p>
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 bg-emerald hover:bg-emerald-bright text-ink transition-all px-6 py-3.5 rounded-lg font-semibold text-sm"
              >
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
    <div>
      <div className="font-display text-3xl text-emerald-bright mb-1">{value}</div>
      <div className="eyebrow text-cream/40 text-[0.55rem]">{label}</div>
    </div>
  );
}
