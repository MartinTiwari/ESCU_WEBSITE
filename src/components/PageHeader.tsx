import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function PageHeader({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="site-page-header">
      <div className="site-page-header-art" aria-hidden="true"><Image src="/images/chemical-welcome-hero.webp" alt="" fill preload sizes="100vw" className="site-page-header-image" /></div>
      <div className="site-page-header-shade" aria-hidden="true" />
      <Reveal className="site-page-header-content">
          <p className="eyebrow text-amber-bright mb-6">{eyebrow}</p>
          <h1>{title}</h1>
          {sub && <p className="site-page-header-sub">{sub}</p>}
          {children}
      </Reveal>
    </section>
  );
}
