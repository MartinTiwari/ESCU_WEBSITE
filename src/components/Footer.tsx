

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
            src="/logo-mark.webp"
            alt="Everest Super Chemical Udhyog"
            width={1037}
            height={503}
            sizes="116px"
            className="h-14 w-auto mb-4"
          />
          <p className="text-sm leading-relaxed max-w-xs">{site.tagline}</p>
        </div>

        <div>
          <div className="eyebrow text-amber-bright mb-4">Explore</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/products" className="hover:text-cream transition-colors">Products</Link></li>
            <li><Link href="/about" className="hover:text-cream transition-colors">About</Link></li>
            <li><Link href="/quote" className="hover:text-cream transition-colors">Get a Quote</Link></li>
            <li><Link href="/privacy" className="hover:text-cream transition-colors">Privacy</Link></li>
            <li><Link href="/buying-guide" className="hover:text-cream transition-colors">Buying guide &amp; FAQs</Link></li>
            <li><a href={whatsappLink("नमस्ते ESCU, मलाई उत्पादन बारे जानकारी चाहिएको छ।")} lang="ne" className="hover:text-cream transition-colors">नेपालीमा कुरा गर्नुहोस्</a></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-amber-bright mb-4">Reach us</div>
          <ul className="space-y-2.5 text-sm">
            <li><a href={`tel:${site.phoneInternational}`} className="hover:text-cream transition-colors">{site.phone}</a></li>
            <li><a href={whatsappLink()} className="hover:text-cream transition-colors">WhatsApp {site.whatsappDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-cream transition-colors break-all">{site.email}</a></li>
            <li><a href={site.instagram} className="hover:text-cream transition-colors">ESCU on Instagram</a></li>
            <li><a href="https://www.google.com/maps?cid=6505991632698609845" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">See ESCU &amp; reviews on Google</a></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-amber-bright mb-4">Where</div>
          <p className="text-sm leading-relaxed">{site.address}</p>
          <p className="text-sm mt-3 text-cream/60">{site.hours}</p>
          <p className="text-sm mt-3 text-cream/60">Deliveries nationwide across Nepal.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5">
        <div className="border-t border-[var(--ink-line)] py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="eyebrow text-cream/40">
            © {new Date().getFullYear()} Everest Super Chemical Udhyog
          </span>
          <span className="eyebrow text-cream/40">Kathmandu · Serving businesses across Nepal</span>
        </div>
      </div>
    </footer>
  );
}
