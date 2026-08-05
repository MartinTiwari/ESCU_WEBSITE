import Image from "next/image";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import { categories, industries, products } from "@/lib/products";
import { photos, categoryPhoto } from "@/lib/photos";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Contours from "@/components/Contours";
import IntroReveal from "@/components/IntroReveal";
import CategoryIcon from "@/components/CategoryIcon";

// The homepage catalogue cards want the single most recognizably "this is
// chemicals" shot per category — drums for water treatment reads clearer
// than a generic treatment-plant photo, so it overrides the standard
// categoryPhoto used everywhere else (product listings, page headers).
const categoryHeroPhoto: Record<string, string> = {
  ...categoryPhoto,
  "Water Treatment Chemicals": photos.drums,
};

const categoryMeta: Record<string, { blurb: string }> = {
  "Water Treatment Chemicals": {
    blurb: "PAC, alum, chlorine, bleaching powder: everything a plant needs to clean and disinfect water.",
  },
  "Swimming Pool Chemicals": {
    blurb: "TCCA, copper sulphate, soda ash, pH adjusters: everything you need to keep pool water balanced, from one supplier.",
  },
  "Housekeeping & Cleaning Chemicals": {
    blurb: "Liquid soap, floor cleaner, phenyl, glass cleaner: the everyday cleaning products hotels and businesses need.",
  },
};

export default function Home() {
  return (
    <div className="bg-cream text-ink">
      <IntroReveal />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section id="hero" className="relative bg-ink text-cream overflow-hidden min-h-screen flex flex-col">
        {/* topographic contour background */}
        <div className="absolute inset-0">
          <Image
            src={photos.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.22] mix-blend-luminosity"
          />
          <Contours />
          <div className="absolute inset-0 grid-blueprint opacity-[0.35]" />
          {/* keep the left column legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/72 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 pt-36 pb-12 md:pt-40">
          <Reveal>
            {/* eyebrow */}
            <div className="flex items-center gap-4 mb-9">
              <span className="w-8 h-px bg-amber-bright/70" />
              <span className="eyebrow text-amber-bright/90">
                Est. BS 2058 &nbsp;·&nbsp; Banshidhar Marg, Kathmandu
              </span>
            </div>

            {/* layered wordmark */}
            <h1 className="font-display font-medium leading-[0.9] tracking-[-0.032em] mb-9">
              <span className="block text-[12.5vw] sm:text-7xl md:text-[5.5rem] lg:text-[6.75rem]">
                Everest Super
              </span>
              <span className="text-outline block text-[12.5vw] sm:text-7xl md:text-[5.5rem] lg:text-[6.75rem]">
                Chemical Udhyog
              </span>
            </h1>

            <div className="max-w-xl">
              <p className="font-display italic text-amber-bright text-xl md:text-2xl leading-snug mb-4">
                Precision chemistry. Dependable supply.
              </p>
              <p className="text-cream/55 text-base md:text-lg leading-relaxed">
                One warehouse in Kathmandu. Three decades of supply. Hotels, hospitals,
                water plants, and pools across Nepal, all ordering from the same place.
              </p>
            </div>

            <div className="flex items-center gap-8 flex-wrap mt-11">
              <Link href="/quote" className="btn-primary">
                Work with us →
              </Link>
              <Link
                href="/products"
                className="text-cream/60 hover:text-cream text-sm font-medium link-ul transition-colors"
              >
                Explore the catalogue
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────── */}
      <div className="border-b border-line overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-8 min-w-max">
          <span className="eyebrow text-ink/35">Relied on by</span>
          {["Hotels and Resorts", "Hospitals", "Water Treatment Plants", "Swimming Pools", "Industrial Plants", "Engineering Projects"].map((t, i) => (
            <span key={t} className="flex items-center gap-8 text-sm font-medium text-ink/60">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-line" aria-hidden />}
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── WHO WE ARE ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[220px_1fr] gap-12 md:gap-20 items-start">
          <Reveal>
            <div className="md:sticky md:top-28">
              <div className="font-display text-[7rem] md:text-[9rem] leading-none text-amber-deep/20 select-none" aria-hidden>
                <CountUp to={site.yearsInOperation} suffix="" />
              </div>
              <div className="eyebrow text-muted mt-2">years of supply</div>
              <div className="w-10 h-px bg-amber mt-6 mb-4" />
              <p className="text-sm text-muted leading-relaxed">
                Founded BS 2058.<br />Kathmandu, Nepal.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="eyebrow text-amber-deep mb-5 flex items-center gap-3">
                <span>01 / 03</span>
                <span className="w-8 h-px bg-amber" />
                <span>About ESCU</span>
              </div>
              <h2 className="font-display text-3xl md:text-[2.8rem] leading-[1.08] tracking-[-0.015em] mb-8 max-w-2xl">
                Clean water, spotless rooms, running plants.{" "}
                <span className="text-ink/38">All from one warehouse in Kathmandu.</span>
              </h2>
              <div className="space-y-5 text-ink/60 text-lg leading-relaxed max-w-xl mb-14">
                <p>
                  For over 30 years, we&apos;ve supplied water treatment plants, hotels,
                  hospitals, and swimming pools across Nepal. We make some chemicals
                  ourselves and import the rest, always the right grade, delivered on time.
                </p>
                <p>
                  We offer wholesale prices, help with how much to use and how to use it,
                  and long-term supply deals for businesses that need more than a one-time
                  order. If your business runs on chemicals, we&apos;ve got you covered.
                </p>
              </div>
            </Reveal>

            <div className="border-t border-line">
              {[
                { tag: "01", label: "Water treatment", body: "PAC, alum, chlorine, and bleaching powder to clean and disinfect water, for a city plant or a single tank." },
                { tag: "02", label: "Pool and hygiene", body: "TCCA, sanitizers, and a full range of cleaning products that keep hotels, resorts, and hospitals clean and ready for inspection." },
                { tag: "03", label: "Bulk supply and delivery", body: "Wholesale prices, expert support, and delivery to every part of Nepal, on time." },
              ].map((p, i) => (
                <Reveal key={p.tag} delay={i * 0.07}>
                  <div className="grid grid-cols-[40px_1fr] gap-6 py-7 border-b border-line hover:bg-paper/50 transition-colors -mx-4 px-4">
                    <span className="eyebrow text-amber-deep pt-1">{p.tag}</span>
                    <div>
                      <h3 className="font-display text-xl mb-2">{p.label}</h3>
                      <p className="text-ink/55 leading-relaxed max-w-xl">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE CATALOGUE ────────────────────────────────── */}
      <section className="bg-paper-2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <Reveal>
            <div className="eyebrow text-amber-deep mb-5 flex items-center gap-3">
              <span>02 / 03</span>
              <span className="w-8 h-px bg-amber" />
              <span>The catalogue</span>
            </div>
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-16">
              <h2 className="font-display font-medium text-4xl md:text-[3.25rem] leading-[1.06] tracking-[-0.02em] max-w-2xl text-ink">
                Everything we stock,{" "}
                <span className="italic text-amber-deep">clearly listed.</span>
              </h2>
              <Link href="/products" className="text-amber-deep font-medium text-sm link-ul shrink-0 mb-2">
                Full catalogue →
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 pb-6 md:pb-10">
            {categories.map((cat, i) => {
              const count = products.filter((p) => p.category === cat).length;
              const meta = categoryMeta[cat];
              return (
                <Reveal key={cat} delay={i * 0.08}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="group flex flex-col h-full bg-cream border border-line hover:border-amber transition-colors overflow-hidden"
                  >
                    {/* full-width photo, masked into the card below rather than
                        floating on top of it */}
                    <div className="relative h-52 md:h-56 shrink-0 overflow-hidden">
                      <Image
                        src={categoryHeroPhoto[cat]}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover grayscale-[0.15] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/0 to-ink/10" />
                      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2 eyebrow text-cream bg-ink/60 px-2 py-1">
                        <CategoryIcon category={cat} className="w-3.5 h-3.5" />
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <span className="absolute top-4 right-4 eyebrow text-cream/90 bg-ink/60 px-2 py-1">
                        {count} products
                      </span>
                    </div>

                    <div className="p-7 pt-6 flex flex-col flex-1">
                      <h3 className="font-display text-2xl text-ink leading-tight mb-3">
                        {cat.replace(" Chemicals", "")}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed mb-6">
                        {meta.blurb}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-ink link-ul">
                        Explore category
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="text-muted text-sm mt-4 max-w-xl leading-relaxed">
              We also stock other supplies: machine oils, test kits, lab acids, and cleaning
              equipment. If it&apos;s used in water treatment, hotels, or industry, we probably
              have it, or can get it for you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-28">
              <div className="eyebrow text-amber-deep mb-4 flex items-center gap-3">
                <span>03 / 03</span>
                <span className="w-8 h-px bg-amber" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-[-0.015em] mb-6">
                Who runs<br />on ESCU supply.
              </h2>
              <p className="text-ink/50 leading-relaxed mb-8 text-[15px]">
                Eight industries, one supplier. We&apos;ve been doing this long enough to
                know what each one needs, and when they need it.
              </p>
              <Link href="/industries" className="inline-flex items-center gap-2 text-ink font-medium text-sm link-ul">
                See by industry →
              </Link>
            </div>
          </Reveal>

          <div className="border-t border-line self-start">
            {industries.map((ind, i) => {
              const count = products.filter((p) => p.industries.includes(ind)).length;
              return (
                <Reveal key={ind} delay={Math.min(i * 0.05, 0.35)}>
                  <Link
                    href={`/industries#${encodeURIComponent(ind)}`}
                    className="group flex items-center justify-between gap-6 py-5 md:py-6 border-b border-line hover:bg-paper/60 transition-colors -mx-4 px-4"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="eyebrow text-muted shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl md:text-2xl group-hover:text-amber-deep transition-colors">
                        {ind}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="eyebrow text-muted hidden sm:block">
                        {count} {count === 1 ? "product" : "products"}
                      </span>
                      <span className="text-muted group-hover:text-amber-deep group-hover:translate-x-0.5 transition-all">→</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPANY STATS ────────────────────────────────── */}
      <section className="border-t-2 border-ink bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: site.yearsInOperation, suffix: "+", label: "Years in business" },
              { value: products.length, suffix: "+", label: "Products stocked" },
              { value: industries.length, suffix: "", label: "Industries served" },
              { value: null, label: "Delivery reach" },
            ].map((s, i) => (
              <div
                key={i}
                className="py-8 md:py-2 md:px-8 border-t md:border-t-0 md:border-l border-line first:border-l-0 first:border-t-0"
              >
                <div className="eyebrow text-amber-deep mb-3">{String(i + 1).padStart(2, "0")}</div>
                <div className="font-display text-4xl md:text-5xl text-ink mb-2">
                  {s.value !== null ? <CountUp to={s.value} suffix={s.suffix ?? ""} /> : "Nepal-wide"}
                </div>
                <div className="eyebrow text-ink/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────── */}
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 grid-blueprint opacity-[0.3]" aria-hidden />
        <div className="scan-line" aria-hidden />

        <div className="max-w-7xl mx-auto px-6 py-28 md:py-40 relative">
          <Reveal>
            <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
              <div>
                <div className="eyebrow text-amber-bright mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-amber-bright" />
                  <span>Get in touch</span>
                </div>
                <h2 className="font-display font-medium text-4xl md:text-[3.5rem] lg:text-[4rem] leading-[1.04] tracking-[-0.02em] max-w-2xl">
                  Not sure what you need?
                  <br />
                  <span className="italic text-amber-bright">Let&apos;s figure it out.</span>
                </h2>
                <p className="text-cream/50 text-lg leading-relaxed mt-8 max-w-lg">
                  Tell us what your business needs and we&apos;ll suggest the right chemicals,
                  give you a fair price, and arrange delivery. No pushy sales.
                </p>
              </div>
              <div className="flex flex-col gap-4 shrink-0 md:items-end">
                <Link href="/quote" className="btn-primary justify-center">
                  Work with us →
                </Link>
                <a
                  href={whatsappLink("Hi ESCU, I'd like to ask about your products.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-dark justify-center"
                >
                  Message on WhatsApp
                </a>
                <a href={`tel:${site.phone}`} className="font-display text-2xl text-cream/80 hover:text-cream transition-colors text-center">
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
