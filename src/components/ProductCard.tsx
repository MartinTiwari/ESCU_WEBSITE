import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product, index }: { product: Product; index?: number }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex items-start justify-between gap-4 py-5 border-b border-line hover:bg-paper/60 transition-colors -mx-4 px-4"
    >
      <div className="flex items-start gap-5 min-w-0">
        {typeof index === "number" && (
          <span className="eyebrow text-muted text-[0.58rem] shrink-0 mt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="font-display text-xl leading-tight text-ink group-hover:text-emerald transition-colors mb-1">
            {product.name}
          </h3>
          <p className="text-muted text-sm">{product.useCase}</p>
        </div>
      </div>
      <span className="text-muted group-hover:text-emerald group-hover:translate-x-0.5 transition-all shrink-0 mt-1">→</span>
    </Link>
  );
}
