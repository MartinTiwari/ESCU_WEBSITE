import type { Metadata } from "next";
import { site } from "./site";

export function pageMetadata({
  title,
  description,
  keywords,
  path = "",
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      images: [{ url: image, width: 1200, height: 630, alt: `${site.name} — chemical supply in Nepal` }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
