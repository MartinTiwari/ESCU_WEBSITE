import Link from "next/link";
import Image from "next/image";
import { site, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/60 mt-auto relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 pt-16 pb-12 grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10">
        <div className="col-span-2 md:col-span-1">
          <Image
            src="/logo-mark.png"
            alt="Everest Super Chemical Udhyog"
            width={1037}
            height={503}
            className="h-14 w-auto mb-4"
          />
          <p className="text-sm leading-relaxed max-w-xs">{site.tagline}</p>
        </div>

        <div>
          <div className="eyebrow text-amber-bright mb-4">Explore</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/products" className="hover:text-cream transition-colors">Products</Link></li>
            <li><Link href="/industries" className="hover:text-cream transition-colors">Industries</Link></li>
            <li><Link href="/about" className="hover:text-cream transition-colors">About</Link></li>
            <li><Link href="/quote" className="hover:text-cream transition-colors">Get a Quote</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-amber-bright mb-4">Reach us</div>
          <ul className="space-y-2.5 text-sm">
            <li><a href={`tel:${site.phone}`} className="hover:text-cream transition-colors">{site.phone}</a></li>
            <li><a href={whatsappLink()} className="hover:text-cream transition-colors">WhatsApp {site.whatsappDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-cream transition-colors break-all">{site.email}</a></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-amber-bright mb-4">Where</div>
          <p className="text-sm leading-relaxed">{site.address}</p>
          <p className="text-sm mt-3 text-cream/45">{site.hours}</p>
          <p className="text-sm mt-3 text-cream/45">Deliveries nationwide across Nepal.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5">
        <div className="border-t border-[var(--ink-line)] py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="eyebrow text-cream/40">
            © {new Date().getFullYear()} Everest Super Chemical Udhyog
          </span>
          <span className="eyebrow text-cream/40">35+ Years · Kathmandu, Nepal</span>
        </div>
      </div>
    </footer>
  );
}
