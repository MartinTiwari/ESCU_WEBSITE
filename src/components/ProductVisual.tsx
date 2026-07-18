import type { Category, Product } from "@/lib/products";

/* ------------------------------------------------------------------
   Crafted product visuals. Each chemical is drawn as its real-world
   packaging/form (sack, jerrycan, bottle, tub, jar, fuel tin) and
   tinted by category. These are placeholders; drop a real photo in
   `product.image` later and it takes over automatically.
   ------------------------------------------------------------------ */

type Form = "sack" | "jerrycan" | "bottle" | "tub" | "flakes" | "crystal" | "fuel";

const ACCENT: Record<Category, string> = {
  "Housekeeping & Cleaning Chemicals": "#2b7aa8",
  "Hospitality & Catering Supplies": "#d98a3d",
  "Swimming Pool Chemicals": "#1898b8",
  "Water Treatment Chemicals": "#175873",
};

function detectForm(p: Product): Form {
  const s = `${p.name} ${p.useCase}`.toLowerCase();
  if (s.includes("fuel")) return "fuel";
  if (s.includes("tcca") || s.includes("tablet")) return "tub";
  if (s.includes("flake")) return "flakes";
  if (s.includes("copper sulphate") || s.includes("crystal")) return "crystal";
  if (s.includes("salt")) return "sack";
  if (/(soap|wash|phenyl|glass|bathroom|ceramic|floor|multi|cleaner)/.test(s)) return "bottle";
  if (s.includes("liquid") || s.includes("chlorine") || s.includes("hypochlorite")) return "jerrycan";
  return "sack"; // powders, ash, alum, PAC, bicarbonate, bleaching…
}

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 255) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
  const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return `rgb(${r},${g},${b})`;
}

export default function ProductVisual({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const accent = product.name.toLowerCase().includes("copper") ? "#2f6fb0" : ACCENT[product.category];
  const dark = shade(accent, -34);
  const form = detectForm(product);
  const initials = product.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative w-full aspect-[4/3] overflow-hidden rounded-lg ${className}`}
      style={{ background: `linear-gradient(160deg, ${accent}14, ${accent}06)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${accent}22 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
          opacity: 0.5,
        }}
      />
      <svg viewBox="0 0 320 240" className="relative w-full h-full" aria-hidden>
        <ellipse cx="160" cy="212" rx="78" ry="10" fill="#0b1d19" opacity="0.09" />
        <Package form={form} accent={accent} dark={dark} initials={initials} />
      </svg>
    </div>
  );
}

function Package({
  form,
  accent,
  dark,
  initials,
}: {
  form: Form;
  accent: string;
  dark: string;
  initials: string;
}) {
  const label = (x: number, y: number, w: number, h: number) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#fbf9f4" opacity="0.95" />
      <text
        x={x + w / 2}
        y={y + h / 2 + 5}
        textAnchor="middle"
        fontFamily="var(--font-mono-tech), monospace"
        fontSize="15"
        fontWeight="700"
        fill={dark}
      >
        {initials}
      </text>
    </g>
  );

  switch (form) {
    case "sack":
      return (
        <g>
          <path d="M96 78 Q160 60 224 78 L214 202 Q160 214 106 202 Z" fill={accent} />
          <path d="M96 78 Q128 92 160 84 Q192 92 224 78 L224 70 Q160 52 96 70 Z" fill={dark} />
          <path d="M96 78 Q160 60 224 78" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" />
          {label(120, 116, 80, 54)}
        </g>
      );
    case "jerrycan":
      return (
        <g>
          <rect x="104" y="70" width="26" height="24" rx="4" fill={dark} />
          <rect x="110" y="60" width="20" height="14" rx="3" fill={accent} />
          <path d="M150 74 h44 a6 6 0 0 1 6 6 v6" fill="none" stroke={dark} strokeWidth="9" strokeLinecap="round" />
          <rect x="100" y="86" width="120" height="118" rx="16" fill={accent} />
          <rect x="100" y="86" width="120" height="118" rx="16" fill="#fff" opacity="0.06" />
          {label(126, 118, 68, 56)}
        </g>
      );
    case "bottle":
      return (
        <g>
          <rect x="150" y="52" width="20" height="20" fill={dark} />
          <path d="M138 52 h30 l14 -14 h-30 z" fill={dark} />
          <rect x="120" y="72" width="80" height="132" rx="14" fill={accent} />
          <rect x="120" y="72" width="80" height="34" rx="14" fill={dark} />
          {label(134, 120, 52, 60)}
        </g>
      );
    case "tub":
      return (
        <g>
          <rect x="104" y="92" width="112" height="112" rx="10" fill={accent} />
          <ellipse cx="160" cy="92" rx="56" ry="16" fill={dark} />
          <ellipse cx="160" cy="86" rx="56" ry="16" fill={accent} />
          <ellipse cx="160" cy="86" rx="56" ry="16" fill="#fff" opacity="0.1" />
          {/* tablets */}
          <circle cx="132" cy="150" r="15" fill="#fbf9f4" opacity="0.92" />
          <circle cx="132" cy="150" r="5" fill={dark} opacity="0.4" />
          <circle cx="170" cy="168" r="15" fill="#fbf9f4" opacity="0.92" />
          <circle cx="170" cy="168" r="5" fill={dark} opacity="0.4" />
          {label(150, 108, 44, 30)}
        </g>
      );
    case "flakes":
      return (
        <g>
          <rect x="112" y="96" width="96" height="108" rx="10" fill={accent} opacity="0.28" />
          <rect x="112" y="96" width="96" height="108" rx="10" fill="none" stroke={accent} strokeWidth="2.5" />
          <rect x="122" y="78" width="76" height="22" rx="5" fill={dark} />
          {[...Array(18)].map((_, i) => (
            <rect
              key={i}
              x={124 + (i % 6) * 12}
              y={150 + Math.floor(i / 6) * 15}
              width="8"
              height="8"
              rx="1.5"
              fill={accent}
              transform={`rotate(${(i * 37) % 90} ${128 + (i % 6) * 12} ${154 + Math.floor(i / 6) * 15})`}
            />
          ))}
          {label(130, 108, 60, 30)}
        </g>
      );
    case "crystal":
      return (
        <g>
          <rect x="112" y="96" width="96" height="108" rx="10" fill={accent} opacity="0.22" />
          <rect x="112" y="96" width="96" height="108" rx="10" fill="none" stroke={accent} strokeWidth="2.5" />
          <rect x="122" y="78" width="76" height="22" rx="5" fill={dark} />
          {[
            [138, 168, 18],
            [166, 176, 22],
            [152, 150, 16],
            [182, 156, 14],
          ].map(([cx, cy, r], i) => (
            <path
              key={i}
              d={`M${cx} ${cy - r} L${cx + r * 0.7} ${cy} L${cx} ${cy + r} L${cx - r * 0.7} ${cy} Z`}
              fill={accent}
              opacity={0.85 - i * 0.08}
            />
          ))}
          {label(130, 108, 60, 30)}
        </g>
      );
    case "fuel":
      return (
        <g>
          {/* flame */}
          <path d="M160 44 C176 60 178 74 168 84 C182 80 184 62 172 48 C180 66 168 72 160 66 C156 58 160 50 160 44 Z" fill={accent} />
          <ellipse cx="160" cy="104" rx="56" ry="14" fill={dark} />
          <rect x="104" y="104" width="112" height="96" fill={accent} />
          <ellipse cx="160" cy="200" rx="56" ry="14" fill={dark} />
          <ellipse cx="160" cy="104" rx="56" ry="14" fill="#fff" opacity="0.12" />
          {label(132, 134, 56, 40)}
        </g>
      );
  }
}
