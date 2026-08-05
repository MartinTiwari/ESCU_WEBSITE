import Image from "next/image";
import { site, whatsappLink } from "@/lib/site";
import { photos } from "@/lib/photos";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us | Chemical Supplier in Kathmandu, Nepal",
  description: `Contact ${site.name} for chemical supply pricing, bulk orders, and technical enquiries. Phone, WhatsApp, and email support based in ${site.address}.`,
  keywords: ["chemical supplier contact Nepal", "chemical supplier Kathmandu phone", "ESCU contact"],
  path: "/contact",
});

const methods = [
  {
    label: "Call us",
    value: site.phone,
    helper: "Most of our orders still start with a phone call. Ring us and ask.",
    href: `tel:${site.phone}`,
    action: "Call now",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path
          d="M4.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L14 13l4 1.5v3a1.5 1.5 0 0 1-1.7 1.5A15.5 15.5 0 0 1 3 6.2 1.5 1.5 0 0 1 4.5 4Z"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Message on WhatsApp",
    value: site.whatsappDisplay,
    helper: "Quickest for a photo of a label, a quantity, or a quick price check.",
    href: whatsappLink("Hi ESCU, I'd like to ask about your products."),
    action: "Open WhatsApp",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M3.5 20.5 5 16.2A8 8 0 1 1 8 19.2l-4.5 1.3Z" strokeLinejoin="round" />
        <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Send an email",
    value: site.email,
    helper: "Best for official documents, spec sheets, and long product lists.",
    href: `mailto:${site.email}`,
    action: "Write to us",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="3" y="5.5" width="18" height="13" rx="2" />
        <path d="m3.8 6.8 8.2 6 8.2-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="Contact"
        title={<>Talk to a <span className="italic text-amber-bright">real supplier.</span></>}
        sub="No call centre, no ticket number. You reach the same people who pack the order and load the truck."
        bgImage={photos.warehouse}
      />

      <div className="max-w-6xl mx-auto px-5 py-16">
        {/* ── Pick a method ─────────────────────────── */}
        <Reveal>
          <div className="flex items-baseline gap-3 mb-8">
            <span className="eyebrow text-amber-deep">01 / Reach us</span>
            <span className="h-px flex-1 bg-line" />
            <span className="eyebrow text-muted">Whichever is easiest</span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {methods.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <a
                href={m.href}
                target={m.external ? "_blank" : undefined}
                rel={m.external ? "noopener noreferrer" : undefined}
                className="group flex flex-col h-full bg-cream border border-line frame-ticks text-amber-deep p-7 transition-all hover:border-amber"
              >
                <div className="w-11 h-11 notch-sm bg-amber/10 text-amber-deep grid place-items-center mb-6 transition-colors group-hover:bg-amber group-hover:text-cream">
                  {m.icon}
                </div>
                <div className="eyebrow text-muted mb-2">{m.label}</div>
                <div className="font-display text-xl text-ink leading-snug mb-3 break-words group-hover:text-amber-deep transition-colors">
                  {m.value}
                </div>
                <p className="text-muted text-sm leading-relaxed mb-6">{m.helper}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  {m.action}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* ── Find the warehouse ────────────────────── */}
        <Reveal>
          <div className="flex items-baseline gap-3 mb-8">
            <span className="eyebrow text-amber-deep">02 / Find us</span>
            <span className="h-px flex-1 bg-line" />
            <span className="eyebrow text-muted">Kathmandu</span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 items-stretch">
          <Reveal>
            <div className="bg-ink text-cream h-full flex flex-col justify-between relative overflow-hidden">
              <div className="relative h-40 shrink-0">
                <Image
                  src={photos.warehouseDispatch}
                  alt="Orders being pulled and packed at the ESCU warehouse"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/0" />
              </div>
              <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none" aria-hidden />
              <div className="relative px-8 pb-8 -mt-6">
                <div className="eyebrow text-amber-bright mb-4">The warehouse</div>
                <p className="font-display text-2xl leading-snug mb-4">{site.address}</p>
                <p className="flex items-center gap-2.5 text-cream/70 text-sm mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0 text-amber-bright">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {site.hours}
                </p>
                <p className="text-cream/55 text-sm leading-relaxed">
                  This is where the stock sits. Collect your order here, or let us
                  load it onto a truck. We deliver to every corner of Nepal.
                </p>
              </div>
              <div className="relative px-8 pb-8 pt-6 border-t border-[var(--ink-line)]">
                <p className="text-cream/45 text-sm leading-relaxed">
                  Supplying hotels, hospitals, pools, and treatment plants from this
                  address for over {site.yearsInOperation} years.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-md overflow-hidden border-2 border-ink h-80 md:h-full min-h-80">
              <iframe
                title="ESCU location map"
                className="w-full h-full min-h-80 grayscale-[0.2] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=17&output=embed`}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
