import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/industries`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/quote`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${site.url}/products/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
