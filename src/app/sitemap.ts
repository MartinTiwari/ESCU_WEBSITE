import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { categoryLandingPages } from "@/lib/category-pages";
import { guides } from "@/lib/guides";

// Record actual content edits, not build times or decorative-only changes.
// Keep unchanged product/category pages on their verified content date.
const CONTENT_LAST_UPDATED = new Date("2026-10-27");
const SUPPLY_COPY_UPDATED = new Date("2026-10-27");
const ANALYTICS_NOTICE_UPDATED = new Date("2026-10-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/buying-guide`, lastModified: SUPPLY_COPY_UPDATED },
    { url: `${site.url}/privacy`, lastModified: ANALYTICS_NOTICE_UPDATED },
    { url: site.url, lastModified: SUPPLY_COPY_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/products`, lastModified: SUPPLY_COPY_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: ANALYTICS_NOTICE_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: new Date("2026-10-06"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/quote`, lastModified: ANALYTICS_NOTICE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/guides`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "monthly", priority: 0.7 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${site.url}/products/${p.slug}`,
    // Owner-confirmed packaging added to every product on 28 October.
    lastModified: new Date("2026-10-28"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryRoutes = categoryLandingPages.map((page) => ({
    url: `${site.url}/chemicals/${page.slug}`,
    lastModified: CONTENT_LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({ url: `${site.url}/guides/${guide.slug}`, lastModified: new Date(guide.updated), changeFrequency: "monthly", priority: 0.7 }));
  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...guideRoutes];
}
