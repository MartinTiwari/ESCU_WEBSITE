import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/60 mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="font-display font-bold text-lg text-white mb-3">{site.name}</div>
          <p className="text-sm leading-relaxed">{site.tagline}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-teal-light font-semibold mb-3">
            Quick Links
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/industries" className="hover:text-white">Industries</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/quote" className="hover:text-white">Request a Quote</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-teal-light font-semibold mb-3">
            Contact
          </div>
          <ul className="space-y-2 text-sm">
            <li>{site.address}</li>
            <li>Phone: {site.phone}</li>
            <li>WhatsApp: {site.whatsappDisplay}</li>
            <li>{site.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
