import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Preview/branch deployments get their own URLs. If one is ever crawled it
// becomes another duplicate of the live site, so only the production build
// advertises itself as indexable.
const isProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : true;

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
