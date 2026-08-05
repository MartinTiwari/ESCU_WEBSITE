import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function PageHeader({
  eyebrow,
  title,
  sub,
  children,
  bgImage,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  children?: React.ReactNode;
  bgImage?: string;
}) {
  return (
    <div className="bg-ink text-cream relative overflow-hidden">
      {bgImage && (
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.28] mix-blend-luminosity"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/60" />
      <div className="absolute inset-0 grid-blueprint opacity-40" />
      <div className="max-w-6xl mx-auto px-5 pt-28 pb-14 md:pt-32 md:pb-16 relative">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-amber-bright" />
            <span className="eyebrow text-amber-bright">{eyebrow}</span>
          </div>
          <h1 className="font-display font-medium text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] max-w-3xl">
            {title}
          </h1>
          {sub && <p className="text-cream/55 text-lg leading-relaxed max-w-2xl mt-5">{sub}</p>}
          {children}
        </Reveal>
      </div>
    </div>
  );
}
