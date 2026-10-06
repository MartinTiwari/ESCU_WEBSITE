"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import { categoryPhoto } from "@/lib/photos";
import type { Category, Product } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

type CatalogueProduct = Pick<Product, "slug" | "name" | "useCase" | "category" | "alsoKnownAs">;

export default function CatalogueSearch({ products, categories, industryFilter }: {
  products: CatalogueProduct[];
  categories: Category[];
  industryFilter?: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = products.filter((product) => {
    const searchable = [product.name, product.useCase, product.category, ...product.alsoKnownAs].join(" ").toLocaleLowerCase();
    return terms.every((term) => searchable.includes(term));
  });

  function clearSearch() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <>
      <div className="mb-6 grid items-start gap-5 md:grid-cols-2 md:gap-8">
        {industryFilter}
      <div className="min-w-0">
        <label htmlFor="catalogue-search" className="block text-sm font-medium text-ink mb-2">Find a product</label>
        <div className="flex items-stretch gap-2">
          <input
            ref={inputRef}
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or use, e.g. PAC or floor cleaner"
            aria-describedby="catalogue-search-count"
            aria-controls="catalogue-results"
            className="min-w-0 flex-1 border border-line px-4 py-3 text-sm text-ink"
          />
          {query && <button type="button" onClick={clearSearch} className="shrink-0 border border-line px-4 text-sm text-ink hover:bg-cream">Clear</button>}
        </div>
        <p id="catalogue-search-count" role="status" aria-live="polite" aria-atomic="true" className="mt-3 text-sm text-muted">
          {matches.length} {matches.length === 1 ? "product" : "products"}{terms.length ? ` matching “${query.trim()}”` : " available"}
        </p>
      </div>
      </div>

      <div id="catalogue-results" className="catalogue-columns">
        {categories.map((category) => {
          const items = matches.filter((product) => product.category === category);
          if (!items.length) return null;
          return (
            <section key={category}>
              <div className="catalogue-group-heading">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="relative w-9 h-9 rounded-md overflow-hidden shrink-0">
                    <Image src={categoryPhoto[category]} alt="" fill sizes="48px" className="object-cover" />
                    <span className="absolute inset-0 bg-ink/30 grid place-items-center text-cream">
                      <CategoryIcon category={category} className="w-[16px] h-[16px]" />
                    </span>
                  </span>
                  <h2 className="font-display text-lg text-ink">{category}</h2>
                </div>
                <span className="text-xs text-muted shrink-0">{items.length} {items.length === 1 ? "product" : "products"}</span>
              </div>
              <div className="catalogue-rows">
                {items.map((product) => (
                  <Link key={product.slug} href={`/products/${product.slug}`} className="catalogue-product">
                    <span><strong>{product.name}</strong><small>{product.useCase}</small></span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      {!matches.length && (
        <div className="border-y border-line py-8">
          <h2 className="font-display text-xl text-ink mb-2">No products found</h2>
          <p className="text-sm text-muted mb-5 max-w-xl">Try a shorter name, another spelling, or a use such as cleaning. We may be able to source products beyond this catalogue.</p>
          <div className="flex flex-wrap items-center gap-4">
            {query && <button type="button" onClick={clearSearch} className="text-sm text-ink underline underline-offset-4">Clear search</button>}
            <a href={whatsappLink(`Hi ESCU, I'm looking for ${query.trim() || "a product for my industry"}. Can you help?`)} target="_blank" rel="noopener noreferrer" className="btn-primary">Ask on WhatsApp</a>
          </div>
        </div>
      )}
    </>
  );
}
