"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "Company" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  // (useEffect for pathname handled via key trick — keep it simple)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-cream/96 backdrop-blur-lg border-b border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" aria-label="Everest Super Chemical Udhyog" className="shrink-0">
          <Image
            src="/logo-mark-ink.png"
            alt="ESCU"
            width={1037}
            height={503}
            priority
            data-brandlogo
            className="h-[30px] w-auto"
          />
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.13em] rounded-md transition-colors ${
                  active
                    ? "text-ink"
                    : "text-ink/40 hover:text-ink hover:bg-paper-2/70"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0.5 left-4 right-4 h-[2px] bg-amber" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/quote"
            className="hidden md:inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.13em] px-5 py-2.5 notch-sm bg-ink text-cream hover:bg-amber transition-colors"
          >
            Work with us
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 rounded-md hover:bg-paper-2 transition-colors"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} transition={{ duration: 0.22 }}
              className="block h-[1.5px] mx-2 bg-ink origin-center" />
            <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.4 : 1 }} transition={{ duration: 0.18 }}
              className="block h-[1.5px] mx-2 bg-ink" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} transition={{ duration: 0.22 }}
              className="block h-[1.5px] mx-2 bg-ink origin-center" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-line bg-cream"
          >
            <div className="max-w-7xl mx-auto px-5 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.13em] border-b border-line last:border-0 transition-colors ${
                    pathname === link.href ? "text-ink" : "text-ink/45 hover:text-ink"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && <span className="w-1.5 h-1.5 bg-amber" />}
                </Link>
              ))}
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center mt-3 mb-1 bg-ink text-cream text-[0.72rem] font-semibold uppercase tracking-[0.13em] py-3.5 notch-sm hover:bg-amber transition-colors"
              >
                Work with us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
