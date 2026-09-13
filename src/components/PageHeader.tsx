import Image from "next/image";

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
      <Image src="/images/liquid-flow-hero.webp" alt="" fill preload sizes="100vw" className="site-page-header-image" />
      <div className="site-page-header-shade" aria-hidden="true" />
      <div className="site-page-header-content">
          <p className="eyebrow text-amber-bright mb-6">{eyebrow}</p>
          <h1>{title}</h1>
          {sub && <p className="site-page-header-sub">{sub}</p>}
          {children}
      </div>
    </section>
  );
}
