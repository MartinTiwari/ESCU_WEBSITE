import Image from "next/image";
import Link from "next/link";
import IntroReveal from "@/components/IntroReveal";
import { site, whatsappLink } from "@/lib/site";
import { products, type Category } from "@/lib/products";
import { photos } from "@/lib/photos";

const ranges: { category: Category; title: string; image: string; description: string; examples: string }[] = [
  { category: "Water Treatment Chemicals", title: "Water treatment.", image: photos.waterTreatment, description: "For the plants and systems that keep clean water flowing.", examples: "PAC · Alum · Chlorine · Bleaching powder" },
  { category: "Swimming Pool Chemicals", title: "Pool chemicals.", image: photos.pool, description: "The essentials for clear, balanced water, all season long.", examples: "TCCA · Copper sulphate · Soda ash" },
  { category: "Housekeeping & Cleaning Chemicals", title: "Cleaning & hygiene.", image: photos.cleaning, description: "Everyday cleaning supplies for busy rooms and shared spaces.", examples: "Liquid soap · Floor cleaner · Glass cleaner" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Home() {
  return (
    <div className="home-page">
      <IntroReveal />
      <section className="element-hero" aria-labelledby="home-title">
        <div className="element-stage">
          <Image
            src="/images/liquid-flow-hero.png"
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
            <p className="element-description">From our signature liquid soap to water treatment and pool care,<br className="company-desktop-break" /> we make and source the essentials businesses across Nepal rely on.</p>
            <div className="company-hero-actions"><Link href="/about" className="element-button">Meet ESCU <Arrow /></Link><Link href="/products" className="company-catalogue-link">Explore our products <Arrow diagonal /></Link></div>
          </div>
          <div className="element-bottomline">
            <span>Chemical supply since {site.founded.bs} BS</span>
<Link href="/products/liquid-soap" className="hero-liquid-link">Discover our liquid soap ↗</Link>
          </div>
        </div>
        <nav className="element-ranges" aria-label="Explore ESCU">
          <Link href="/products/liquid-soap"><span className="element-range-index">01</span><span><small>OUR MAIN PRODUCT</small><strong>Liquid soap</strong></span><Arrow diagonal /></Link>
          <Link href="/products"><span className="element-range-index">02</span><span><small>THREE SPECIALIST RANGES</small><strong>One complete supply</strong></span><Arrow diagonal /></Link>
          <Link href="/about"><span className="element-range-index">03</span><span><small>ESTABLISHED {site.founded.bs} BS</small><strong>People you can call</strong></span><Arrow diagonal /></Link>
        </nav>
      </section>
      <div className="home-service-strip"><span>One supplier. The whole order.</span><span>Wholesale & bulk supply</span><span>Delivery across Nepal</span><span>Support from real people <span aria-hidden="true">↗</span></span></div>

      <section id="our-range" className="home-range home-container" aria-labelledby="range-title">
        <div className="home-section-top"><p className="home-kicker">WHAT WE SUPPLY</p><span className="home-section-index">01 /</span></div>
        <div className="home-section-heading"><h2 id="range-title">Good chemistry.<br /><span>For the everyday.</span></h2><div><p>Three specialist ranges. One place to source the chemicals your business depends on.</p><Link href="/products" className="home-text-link">View all {products.length} products <Arrow /></Link></div></div>
        <div className="home-range-grid">
          {ranges.map((range, i) => <Link className="home-range-item" key={range.category} href={`/products?category=${encodeURIComponent(range.category)}`}>
            <div className="home-range-image"><Image src={range.image} alt="" fill sizes="(min-width: 760px) 32vw, 100vw" /><span className="home-range-number">0{i + 1}</span><span className="home-range-arrow"><Arrow diagonal /></span></div>
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
