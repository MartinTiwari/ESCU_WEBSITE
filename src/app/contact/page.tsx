import { site, whatsappLink } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Contact | Everest Super Chemical Udhyog" };

export default function ContactPage() {
  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="Contact"
        title={<>Talk to a <span className="italic text-emerald-bright">real supplier.</span></>}
        sub="Reach out for pricing, bulk orders, or technical enquiries. We offer customised supply solutions and long-term agreements for businesses across Nepal."
      />

      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-10">
          <Reveal>
            <div className="border-t border-l border-line">
              <ContactItem index="01" label="Phone" value={site.phone} href={`tel:${site.phone}`} />
              <ContactItem
                index="02"
                label="WhatsApp"
                value={site.whatsappDisplay}
                href={whatsappLink("Hi ESCU, I'd like to ask about your products.")}
                external
              />
              <ContactItem index="03" label="Email" value={site.email} href={`mailto:${site.email}`} />
              <ContactItem index="04" label="Location" value={site.address} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl overflow-hidden border border-line h-80 md:h-full min-h-80 shadow-[0_18px_40px_-24px_rgba(11,29,25,0.5)]">
              <iframe
                title="ESCU location map"
                className="w-full h-full min-h-80 grayscale-[0.2] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  index,
  label,
  value,
  href,
  external,
}: {
  index: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="group flex items-center justify-between gap-4 border-b border-r border-line px-6 py-6 transition-colors hover:bg-cream h-full">
      <div className="flex items-baseline gap-4">
        <span className="eyebrow text-muted group-hover:text-emerald text-[0.6rem] transition-colors">{index}</span>
        <div>
          <div className="eyebrow text-emerald text-[0.58rem] mb-1.5">{label}</div>
          <div className="text-ink font-medium">{value}</div>
        </div>
      </div>
      {href && <span className="text-muted group-hover:text-emerald group-hover:translate-x-1 transition-all">→</span>}
    </div>
  );
  if (!href) return content;
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="block">
      {content}
    </a>
  );
}
