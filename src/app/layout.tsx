import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PageBondProgress from "@/components/PageBondProgress";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Editorial serif with real character (not the templated Playfair).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

// Technical mono for spec-sheet eyebrows and product codes.
const spaceMono = Space_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} (${site.shortName}) | Chemical Supplier in Nepal`,
    template: `%s | ${site.shortName}`,
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
    images: [{ url: "/logo-white.png" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} (${site.shortName}) | Chemical Supplier in Nepal`,
    description: site.tagline,
    images: ["/logo-white.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1d19",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Store", "LocalBusiness"],
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  image: `${site.url}/logo-mark.png`,
  logo: `${site.url}/logo-mark.png`,
  description: site.tagline,
  telephone: site.phone,
  email: site.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Banshidhar Marg",
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
  areaServed: "NP",
  foundingDate: "2001",
  sameAs: [] as string[],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <PageBondProgress />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
