import Image from "next/image";
import Link from "next/link";
import IntroReveal from "@/components/IntroReveal";
import { site, whatsappLink } from "@/lib/site";
import { products, type Category } from "@/lib/products";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: `Chemical Supplier in Kathmandu, Nepal | ${site.name}`,
    description: "ESCU manufactures and supplies water treatment, pool and cleaning chemicals from Kathmandu. Request wholesale pricing and bulk delivery across Nepal.",
    path: "/",
  }),
  title: { absolute: `Chemical Supplier in Kathmandu, Nepal | ${site.name}` },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: `${site.url}/`,
  name: site.name,
  alternateName: ["Everest Super Chemical", site.shortName],
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#organization` },
};

const ranges: { category: Category; title: string; image: string; description: string; examples: string }[] = [
  { category: "Water Treatment Chemicals", title: "Water treatment.", image: photos.waterTreatment, description: "For the plants and systems that keep clean water flowing.", examples: "PAC · Alum · Chlorine · Bleaching powder" },
  { category: "Swimming Pool Chemicals", title: "Pool chemicals.", image: photos.pool, description: "The essentials for clear, balanced water, all season long.", examples: "TCCA · Copper sulphate · Soda ash" },
  { category: "Housekeeping & Cleaning Chemicals", title: "Cleaning & hygiene.", image: photos.cleaning, description: "Everyday cleaning supplies for busy rooms and shared spaces.", examples: "Surface care · Hand hygiene · Housekeeping" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Home() {
  return (
    <div className="home-page">
      <IntroReveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }} />
      <section className="element-hero" aria-labelledby="home-title">
        <div className="element-stage">
          <Image
            src="/images/liquid-flow-hero.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="element-photograph"
          />
          <div className="element-shade" aria-hidden="true" />
          <div className="element-topline">
            <span>MADE HERE. SOURCED DIRECTLY.</span>
            <span>SUPPLYING BUSINESSES ACROSS NEPAL <span aria-hidden="true">↗</span></span>
          </div>
          <div className="element-copy">
            <p className="element-intro">Everest Super Chemical Udhyog · Kathmandu, Nepal</p>
            <h1 id="home-title">EVERYDAY ESSENTIALS.<br /><span>EXPERTLY SUPPLIED.</span></h1>
            <p className="element-description">A dependable range of chemicals and allied supplies,<br className="company-desktop-break" /> manufactured and sourced for businesses across Nepal.</p>
            <div className="company-hero-actions"><Link href="/about" className="element-button">Meet ESCU <Arrow /></Link><Link href="/products" className="company-catalogue-link">Explore our products <Arrow diagonal /></Link></div>
          </div>
          <div className="element-bottomline">
            <span>Kathmandu based · Serving Nepal</span>
            <Link href="/products" className="hero-range-link">Explore our chemical range ↗</Link>
          </div>
        </div>
        <div className="element-capabilities" aria-label="Our supply capabilities">
          <div><small>01 · EXPERIENCE</small><strong>35+ years in business</strong></div>
          <div><small>02 · RANGE</small><strong>Broad chemical portfolio</strong></div>
          <div><small>03 · SUPPLY</small><strong>Wholesale & bulk orders</strong></div>
          <div><small>04 · SERVICE</small><strong>Delivery across Nepal</strong></div>
        </div>
      </section>

      <section id="our-range" className="home-range home-container" aria-labelledby="range-title">
        <div className="home-section-top"><p className="home-kicker">WHAT WE SUPPLY</p><span className="home-section-index">01 /</span></div>
        <div className="home-section-heading"><h2 id="range-title">Chemical supply.<br /><span>Across Nepal.</span></h2><div><p>A practical range for water treatment, cleaning, pool care and industrial applications, available for wholesale and bulk orders across Nepal.</p><Link href="/products" className="home-text-link">View all {products.length} products <Arrow /></Link></div></div>
        <div className="home-range-grid">
          {ranges.map((range, i) => <Link className="home-range-item" key={range.category} href={`/products?category=${encodeURIComponent(range.category)}`}>
            <div className="home-range-image"><Image src={range.image} alt={`${range.category} — illustrative application photo`} fill sizes="(min-width: 1280px) 410px, (min-width: 760px) 32vw, 100vw" /><span className="home-range-number">0{i + 1}</span><span className="home-range-arrow"><Arrow diagonal /></span></div>
            <p className="home-range-category">{range.category.replace(" Chemicals", "")}</p><h3>{range.title}</h3><p className="home-range-description">{range.description}</p><p className="home-range-examples">{range.examples}</p>
          </Link>)}
        </div>
        <div className="home-range-bottom"><p>Need machine oils, test kits or other allied supplies?</p><a href={whatsappLink("Hi ESCU, I'm looking for a product and would like to check availability.")} className="home-text-link">Ask us what’s available <Arrow diagonal /></a></div>
      </section>

      <section className="home-about" aria-labelledby="about-title">
        <div className="home-container home-about-grid"><div><p className="home-kicker">THE PEOPLE BEHIND THE SUPPLY</p><h2 id="about-title">Big on supply.<br /><span>Personal by nature.</span></h2><p className="home-about-body">We’re Everest Super Chemical Udhyog. We manufacture some of our products and import the rest directly, bringing water treatment, pool and housekeeping supplies together under one roof.</p><p className="home-about-body">Whether you’re buying for a hotel, a hospital or a treatment plant, you can speak to us about the product, the quantity and the next delivery.</p><Link href="/about" className="home-text-link">Get to know ESCU <Arrow /></Link></div><div className="home-about-facts"><div><span>01</span><h3>A single point of contact</h3><p>One team for your water treatment, pool and cleaning supplies.</p></div><div><span>02</span><h3>Built around your order</h3><p>Wholesale quantities and long-term supply plans for repeat requirements.</p></div><div><span>03</span><h3>Here to help you choose</h3><p>Talk through product selection and request specifications with our team.</p></div></div></div>
      </section>

      <section className="home-industries home-container" aria-labelledby="industries-title"><div><p className="home-kicker">WHERE OUR SUPPLY GOES</p><h2 id="industries-title">Behind the scenes.<br />Across Nepal.</h2><Link href="/industries" className="home-text-link">Find your industry <Arrow /></Link></div><div className="home-industry-list">{["Hotels & Resorts", "Water Treatment Plants", "Swimming Pools", "Hospitals", "Industrial Plants", "Restaurants & Cafes", "Commercial Buildings", "Engineering Projects"].map((industry) => <Link href="/industries" key={industry}>{industry}<Arrow diagonal /></Link>)}</div></section>

      <section className="home-contact" aria-labelledby="contact-title"><div className="home-container"><p className="home-kicker">LET’S GET YOUR ORDER STARTED</p><div className="home-contact-main"><h2 id="contact-title">What’s on<br />your supply list?</h2><div><p>Send us the products and quantities you need. We’ll help you put the order together.</p><Link href="/quote" className="home-button">Request a quote <Arrow diagonal /></Link><a href={`tel:${site.phone}`} className="home-contact-phone">Or call {site.phone}</a></div></div><div className="home-contact-bottom"><span>Everest Super Chemical Udhyog</span><span>Banshidhar Marg · Kathmandu</span></div></div></section>
    </div>
  );
}
