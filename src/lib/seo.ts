import type { Metadata } from "next";
import { site } from "./site";

export function pageMetadata({
  title,
  description,
  keywords,
  path = "",
  image = "/logo-white.png",
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
      images: [{ url: image }],
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
