import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "About Us | Everest Super Chemical Udhyog" };

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="35+ Years · Kathmandu"
        title={<>Three and a half decades of <span className="italic text-emerald-bright">keeping Nepal supplied.</span></>}
      />

      <div className="max-w-5xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-start mb-20">
          <Reveal>
            <div className="space-y-5 text-fg text-lg leading-relaxed">
              <p>
                <span className="font-display text-2xl text-ink">Everest Super Chemical Udhyog (ESCU)</span> is
                a Kathmandu-based supplier of water treatment chemicals, swimming pool solutions,
                housekeeping products, and catering fuel, serving hotels, resorts, hospitals, and
                industries across Nepal.
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
          <div className="eyebrow text-emerald mb-3">01 / What you get</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">Why choose us</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 border-t border-l border-line mb-20">
          {site.whyChooseUs.map((item, i) => (
            <Reveal key={item} delay={Math.min(i * 0.04, 0.3)}>
              <div className="flex items-start gap-3.5 border-b border-r border-line px-6 py-5 h-full">
                <span className="eyebrow text-emerald text-[0.62rem] mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink">{item}</span>
              </div>
            </Reveal>
          ))}
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
