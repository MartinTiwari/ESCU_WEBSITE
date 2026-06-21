import Link from "next/link";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="bg-navy sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-display font-bold text-lg text-white">Everest</span>
          <span className="font-display font-bold text-lg text-teal-light">Super Chemical</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/75 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/quote"
          className="bg-teal hover:bg-teal-light transition-colors text-white text-sm font-semibold px-4 py-2 rounded-md"
        >
          Request a Quote
        </Link>
      </div>
    </header>
  );
}
