"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Industry, Product } from "@/lib/products";

export default function IndustryDirectory({ groups }: {
  groups: { name: Industry; photo: string; products: Pick<Product, "slug" | "name" | "useCase">[] }[];
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const revealHash = () => {
      let id = "";
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = Array.from(root.current?.querySelectorAll("details") ?? []).find((item) => item.id === id);
      if (target) {
        target.open = true;
        target.scrollIntoView({ block: "start" });
      }
    };
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, []);
  return (
    <div ref={root} className="industry-directory">
      {groups.map((group, i) => (
        <details key={group.name} id={group.name} className="industry-disclosure" open={i === 0}>
          <summary>
            <span className="industry-thumbnail"><Image src={group.photo} alt="" fill sizes="48px" /></span>
            <span className="industry-summary-name">{group.name}</span>
            <span className="industry-summary-count">{group.products.length} products</span>
            <span className="industry-toggle" aria-hidden="true">+</span>
          </summary>
          <div className="industry-product-grid">
            {group.products.map((product) => (
              <Link href={`/products/${product.slug}`} key={product.slug} className="catalogue-product">
                <span><strong>{product.name}</strong><small>{product.useCase}</small></span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
