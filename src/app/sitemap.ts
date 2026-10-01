import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { categoryLandingPages } from "@/lib/category-pages";

// Google ignores <changefreq> and <priority> outright, but it does read
// <lastmod> when scheduling crawls — and the sitemap had none, so every URL
// looked equally stale. Bump this by hand when page content actually changes.
// Deliberately not `new Date()`: a lastmod that always reads "now" is treated
// as noise and discounted, which is worse than having none.
const CONTENT_LAST_UPDATED = new Date("2026-10-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/buying-guide`, lastModified: new Date("2026-09-17") },
    { url: `${site.url}/privacy`, lastModified: CONTENT_LAST_UPDATED },
    { url: site.url, lastModified: new Date("2026-09-17"), changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/products`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/industries`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/about`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/quote`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: "monthly", priority: 0.8 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${site.url}/products/${p.slug}`,
    lastModified: new Date("2026-09-17"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryRoutes = categoryLandingPages.map((page) => ({
    url: `${site.url}/chemicals/${page.slug}`,
    lastModified: new Date("2026-10-01"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
