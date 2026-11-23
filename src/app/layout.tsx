import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./mobile-home.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import { site } from "@/lib/site";

// Bundle the same Latin font assets used by the existing site. Deployment no
// longer depends on Google Fonts CSS responses or the Google-font resolver.
const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "300 700",
  display: "swap",
});

// Editorial serif with real character (not the templated Playfair).
const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-latin.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/fraunces-latin-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Technical mono for spec-sheet eyebrows and product codes.
const spaceMono = localFont({
  src: [
    { path: "./fonts/space-mono-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono-tech",
  display: "swap",
});

const isProductionDeployment = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  verification: {
    other: { "msvalidate.01": "74CAC297A7633CE7320D092374D1D267" },
  },
  title: {
    default: `Chemical Supplier in Kathmandu, Nepal | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "chemical supplier Nepal",
    "industrial chemicals Nepal",
    "water treatment chemicals Nepal",
    "swimming pool chemicals Nepal",
    "housekeeping chemicals Nepal",
    "chemical supplier Kathmandu",
    "PAC powder Nepal",
    "liquid chlorine Nepal",
    "caustic soda Nepal",
    "alum Nepal",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    title: `${site.name} (${site.shortName}) | Chemical Supplier in Nepal`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — chemical supply in Nepal` }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} (${site.shortName}) | Chemical Supplier in Nepal`,
    description: site.tagline,
    images: ["/opengraph-image"],
  },
  robots: {
    index: isProductionDeployment,
    follow: isProductionDeployment,
    googleBot: { index: isProductionDeployment, follow: isProductionDeployment, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061d35",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Store", "LocalBusiness"],
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  image: `${site.url}/logo-mark.png`,
  logo: `${site.url}/logo-mark.png`,
  description: site.tagline,
  telephone: site.phoneInternational,
  email: site.email,
  hasMap: "https://www.google.com/maps?cid=6505991632698609845",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.streetAddress,
    addressLocality: "Kathmandu",
    addressRegion: "Bagmati",
    postalCode: "44600",
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
  areaServed: { "@type": "Country", name: "Nepal" },
  // The confirmed founding year is 2048 BS; omit an unconfirmed Gregorian date.
  sameAs: [site.instagram, "https://www.google.com/maps?cid=6505991632698609845"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [jsonLd, {
              "@type": "WebSite", "@id": `${site.url}/#website`,
              url: `${site.url}/`, name: site.name,
              alternateName: ["Everest Super Chemical", site.shortName],
              inLanguage: "en", publisher: { "@id": `${site.url}/#organization` },
            }],
          }).replace(/</g, "\\u003c") }}
        />
        <Header />

        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
