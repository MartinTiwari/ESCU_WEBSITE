import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import { categories, industries, products } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-gold text-xs font-bold uppercase tracking-[3px] mb-4">
              Kathmandu, Nepal
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl leading-tight mb-5">
              Everest Super
              <br />
              <span className="text-teal-light">Chemical Udhyog</span>
            </h1>
            <p className="text-white/65 text-base leading-relaxed max-w-lg mb-8">
              {site.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="bg-teal hover:bg-teal-light transition-colors px-6 py-3 rounded-md font-semibold text-sm"
              >
                Request a Quote
              </Link>
              <Link
                href="/products"
                className="border border-white/25 hover:border-white/50 transition-colors px-6 py-3 rounded-md font-semibold text-sm"
              >
                Browse Products
              </Link>
            </div>
          </div>
          <div className="justify-self-center md:justify-self-end">
            <div className="border border-gold/40 bg-gold/10 rounded-lg px-7 py-6 text-center">
              <span className="font-display font-bold text-4xl text-gold block leading-none mb-1">
                {site.yearsInOperation}+
              </span>
              <span className="text-[10px] uppercase tracking-[2px] text-gold/80">
                Years in Operation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-teal text-white">
        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-medium">
          {site.trustSignals.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      {/* INDUSTRY FINDER */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-navy mb-1">Find Chemicals by Industry</h2>
          <p className="text-grey-400 text-sm">
            Choose your industry to see the products we supply for it.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {industries.map((ind) => (
            <Link
              key={ind}
              href={`/industries#${encodeURIComponent(ind)}`}
              className="bg-white border border-grey-100 rounded-lg px-4 py-5 text-center hover:border-teal hover:shadow-md transition-all"
            >
              <span className="text-sm font-semibold text-navy">{ind}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-grey-50">
        <div className="max-w-6xl mx-auto px-5 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-1">Featured Products</h2>
              <p className="text-grey-400 text-sm">A sample from our {products.length}+ product catalogue.</p>
            </div>
            <Link href="/products" className="text-teal font-semibold text-sm hover:underline whitespace-nowrap">
              View all products →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="bg-white border border-grey-100 rounded-lg p-5 hover:border-teal hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-navy text-sm mb-1">{p.name}</h3>
                <p className="text-grey-400 text-xs">{p.useCase}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES OVERVIEW */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="text-2xl font-bold text-navy mb-8">Our Product Categories</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/products?category=${encodeURIComponent(c)}`}
              className="border border-grey-100 rounded-lg p-6 hover:border-teal hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-navy mb-1">{c}</h3>
              <p className="text-grey-400 text-sm">
                {products.filter((p) => p.category === c).length} products
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-5 py-16 text-center">
          <h2 className="font-display font-bold text-3xl mb-3">Need pricing or bulk supply?</h2>
          <p className="text-white/65 max-w-xl mx-auto mb-7">
            Reach out for pricing, bulk orders, or technical enquiries. We offer customized
            supply solutions and long-term agreements for businesses across Nepal.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/quote"
              className="bg-teal hover:bg-teal-light transition-colors px-6 py-3 rounded-md font-semibold text-sm"
            >
              Request a Quote
            </Link>
            <a
              href={whatsappLink("Hi ESCU, I'd like to ask about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/25 hover:border-white/50 transition-colors px-6 py-3 rounded-md font-semibold text-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
