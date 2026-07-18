import Link from "next/link";
import { site } from "@/lib/site";
import { categories, industries, products } from "@/lib/products";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Contours from "@/components/Contours";
import IntroReveal from "@/components/IntroReveal";

const formulas = [
  ["NaOCl", "Liquid Chlorine"],
  ["TCCA 90%", "Pool Sanitizer"],
  ["Al₂(SO₄)₃", "Alum"],
  ["PAC", "Poly Aluminium Chloride"],
  ["CuSO₄·5H₂O", "Copper Sulphate"],
  ["Ca(OCl)₂", "Bleaching Powder"],
  ["NaOH", "Caustic Soda"],
  ["Na₂CO₃", "Soda Ash"],
  ["NaHCO₃", "Sodium Bicarbonate"],
] as const;

const categoryMeta: Record<string, { blurb: string }> = {
  "Water Treatment Chemicals": {
    blurb: "PAC, alum, chlorine, bleaching powder — everything a plant needs to clarify and disinfect at scale.",
  },
  "Swimming Pool Chemicals": {
    blurb: "TCCA, copper sulphate, soda ash, pH adjusters — pool chemistry sorted from one supplier.",
  },
  "Housekeeping & Cleaning Chemicals": {
    blurb: "Liquid soap, floor cleaner, phenyl, glass cleaner — the daily housekeeping range for hospitality and commercial operations.",
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
          <Contours />
          {/* warm summit glow */}
          <div className="absolute right-[6%] top-[14%] h-[52vh] w-[52vh] rounded-full bg-emerald/20 blur-[140px]" />
          {/* keep the left column legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/72 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 pt-36 pb-12 md:pt-40">
          <Reveal>
            {/* eyebrow */}
            <div className="flex items-center gap-4 mb-9">
              <span className="w-8 h-px bg-emerald-bright/50" />
              <span className="eyebrow text-emerald-bright/85">
                Est. BS 2058 &nbsp;·&nbsp; Gokarneshor, Kathmandu
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
              <p className="font-display italic text-emerald-bright text-xl md:text-2xl leading-snug mb-4">
                Precision chemistry. Dependable supply.
              </p>
              <p className="text-cream/55 text-base md:text-lg leading-relaxed">
                One counter in Kathmandu. Three decades of supply. Hotels, hospitals,
                water plants, and pools across Nepal, all ordering from the same place.
              </p>
            </div>

            <div className="flex items-center gap-8 flex-wrap mt-11">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-bright text-ink text-sm font-semibold px-8 py-4 rounded-full transition-colors"
              >
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

        {/* formula ticker */}
        <div className="marquee relative z-10 border-t border-[var(--ink-line)] py-4 overflow-hidden whitespace-nowrap">
          <div className="marquee-track">
            {[...formulas, ...formulas].map(([f, name], i) => (
              <span key={i} className="inline-flex items-center gap-3 px-7">
                <span className="font-mono text-emerald-bright text-sm">{f}</span>
                <span className="eyebrow text-cream/40">{name}</span>
                <span className="w-1 h-1 rounded-full bg-emerald-bright/50 ml-4" />
              </span>
            ))}
          </div>
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
              <div className="font-display text-[7rem] md:text-[9rem] leading-none text-emerald/20 select-none" aria-hidden>
                <CountUp to={site.yearsInOperation} suffix="" />
              </div>
              <div className="eyebrow text-muted mt-2">years of supply</div>
              <div className="w-10 h-px bg-emerald mt-6 mb-4" />
              <p className="text-sm text-muted leading-relaxed">
                Founded BS 2058.<br />Kathmandu, Nepal.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="eyebrow text-emerald mb-5 flex items-center gap-3">
                <span>01 / 03</span>
                <span className="w-8 h-px bg-emerald" />
                <span>About ESCU</span>
              </div>
              <h2 className="font-display text-3xl md:text-[2.8rem] leading-[1.08] tracking-[-0.015em] mb-8 max-w-2xl">
                Clean water, spotless rooms, running plants.{" "}
                <span className="text-ink/38">All from one counter in Kathmandu.</span>
              </h2>
              <div className="space-y-5 text-ink/60 text-lg leading-relaxed max-w-xl mb-14">
                <p>
                  Everest Super Chemical Udhyog has supplied water treatment plants, hotels,
                  hospital washrooms, and swimming pools across Nepal for over three decades.
                  The same families of chemicals, reliably sourced, correctly graded, and
                  delivered on schedule.
                </p>
                <p>
                  We offer wholesale pricing, technical guidance on dosing and application,
                  and long-term supply agreements for businesses that need more than a one-off
                  purchase. If you run an operation that depends on chemicals, we are built for you.
                </p>
              </div>
            </Reveal>

            <div className="border-t border-line">
              {[
                { tag: "01", label: "Water treatment", body: "PAC, alum, chlorine, and bleaching powder for clarification and disinfection at municipal scale or a single tank." },
                { tag: "02", label: "Pool and hygiene", body: "TCCA, sanitizers, and a full housekeeping range that keeps hotels, resorts, and hospitals inspection-ready." },
                { tag: "03", label: "Bulk supply and delivery", body: "Wholesale pricing, technical support, and delivery that reaches every corner of Nepal, on schedule." },
              ].map((p, i) => (
                <Reveal key={p.tag} delay={i * 0.07}>
                  <div className="grid grid-cols-[40px_1fr] gap-6 py-7 border-b border-line hover:bg-paper/50 transition-colors -mx-4 px-4">
                    <span className="eyebrow text-emerald pt-1">{p.tag}</span>
                    <div>
                      <h3 className="font-display text-xl mb-2">{p.label}</h3>
                      <p className="text-ink/55 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE CATALOGUE ────────────────────────────────── */}
      <section className="bg-ink text-cream">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <Reveal>
            <div className="eyebrow text-emerald-bright mb-5 flex items-center gap-3">
              <span>02 / 03</span>
              <span className="w-8 h-px bg-emerald-bright" />
              <span>The catalogue</span>
            </div>
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-16">
              <h2 className="font-display font-medium text-4xl md:text-[3.25rem] leading-[1.06] tracking-[-0.02em] max-w-2xl">
                Everything we stock,{" "}
                <span className="italic text-emerald-bright">indexed.</span>
              </h2>
              <Link href="/products" className="text-emerald-bright font-medium text-sm link-ul shrink-0 mb-2">
                Full catalogue →
              </Link>
            </div>
          </Reveal>

          <div className="border-t border-[var(--ink-line)]">
            {categories.map((cat, i) => {
              const count = products.filter((p) => p.category === cat).length;
              const meta = categoryMeta[cat];
              return (
                <Reveal key={cat} delay={i * 0.08}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[48px_1fr_340px_80px] gap-6 md:gap-10 py-8 md:py-10 border-b border-[var(--ink-line)] items-center hover:border-emerald-bright/50 transition-colors"
                  >
                    <span className="font-mono text-xl text-emerald-bright/50 group-hover:text-emerald-bright transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-display text-2xl md:text-3xl text-cream group-hover:text-emerald-bright transition-colors leading-tight mb-1">
                        {cat}
                      </div>
                      <p className="text-cream/40 text-sm leading-relaxed hidden md:block max-w-md">
                        {meta.blurb}
                      </p>
                    </div>
                    <div className="hidden md:block text-right">
                      <span className="eyebrow text-cream/30">{count} products</span>
                    </div>
                    <span className="text-cream/30 group-hover:text-emerald-bright group-hover:translate-x-1 transition-all text-lg text-right">→</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="text-cream/35 text-sm mt-10 max-w-2xl leading-relaxed">
              Plus allied supplies beyond these families: machine oils, test kits, lab acids, and
              cleaning equipment. If it is used in water treatment, hospitality, or industry,
              we most likely stock it or can source it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-28">
              <div className="eyebrow text-emerald mb-4 flex items-center gap-3">
                <span>03 / 03</span>
                <span className="w-8 h-px bg-emerald" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-[-0.015em] mb-6">
                Who runs<br />on ESCU supply.
              </h2>
              <p className="text-ink/50 leading-relaxed mb-8 text-[15px]">
                Eight sectors, one supplier. We have operated long enough to understand
                what each industry actually needs and when they need it.
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
                      <span className="eyebrow text-muted text-[0.58rem] shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl md:text-2xl group-hover:text-emerald transition-colors">
                        {ind}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="eyebrow text-muted text-[0.58rem] hidden sm:block">
                        {count} {count === 1 ? "product" : "products"}
                      </span>
                      <span className="text-muted group-hover:text-emerald group-hover:translate-x-0.5 transition-all">→</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPANY STATS ────────────────────────────────── */}
      <section className="border-t border-line bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {[
              { value: site.yearsInOperation, suffix: "+", label: "Years in business" },
              { value: products.length, suffix: "+", label: "Products stocked" },
              { value: industries.length, suffix: "", label: "Industries served" },
              { value: null, label: "Delivery reach" },
            ].map((s, i) => (
              <div key={i} className="bg-paper-2 p-8 md:p-10">
                <div className="font-display text-4xl md:text-5xl text-emerald mb-2">
                  {s.value !== null ? <CountUp to={s.value} suffix={s.suffix ?? ""} /> : "Nepal-wide"}
                </div>
                <div className="eyebrow text-ink/40 text-[0.58rem]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────── */}
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {[
            { l: "8%", s: 22, d: "16s", delay: "0s", o: 0.35 },
            { l: "22%", s: 12, d: "13s", delay: "3s", o: 0.3 },
            { l: "38%", s: 30, d: "19s", delay: "6s", o: 0.25 },
            { l: "55%", s: 10, d: "12s", delay: "1.5s", o: 0.35 },
            { l: "70%", s: 18, d: "15s", delay: "8s", o: 0.3 },
            { l: "84%", s: 26, d: "18s", delay: "4s", o: 0.28 },
            { l: "93%", s: 14, d: "14s", delay: "10s", o: 0.32 },
          ].map((b, i) => (
            <span
              key={i}
              className="bubble"
              style={{
                left: b.l, width: b.s, height: b.s,
                ["--bd" as string]: b.d,
                ["--bdelay" as string]: b.delay,
                ["--bo" as string]: b.o,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-28 md:py-40 relative">
          <Reveal>
            <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
              <div>
                <div className="eyebrow text-emerald-bright mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-emerald-bright" />
                  <span>Get in touch</span>
                </div>
                <h2 className="font-display font-medium text-4xl md:text-[3.5rem] lg:text-[4rem] leading-[1.04] tracking-[-0.02em] max-w-2xl">
                  Not sure what you need?
                  <br />
                  <span className="italic text-emerald-bright">Let&apos;s figure it out.</span>
                </h2>
                <p className="text-cream/50 text-lg leading-relaxed mt-8 max-w-lg">
                  Tell us what you are running and we will recommend the right chemicals,
                  quote a fair price, and arrange delivery. No hard sell.
                </p>
              </div>
              <div className="flex flex-col gap-4 shrink-0 md:items-end">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 bg-emerald hover:bg-emerald-bright text-ink text-sm font-semibold px-8 py-4 rounded-full transition-colors"
                >
                  Work with us →
                </Link>
                <Link href="/contact" className="text-cream/60 hover:text-cream text-sm font-medium text-center link-ul">
                  Or just call the counter
                </Link>
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
