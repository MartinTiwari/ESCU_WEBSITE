import type { NextConfig } from "next";

const securityHeaders = [
  // stop the site being framed by another origin (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // stop browsers guessing content types away from what we declare
  { key: "X-Content-Type-Options", value: "nosniff" },
  // don't leak the full URL (incl. query strings) to third-party links
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // this site doesn't use camera/mic/geolocation/etc — say so explicitly
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // hide the little Next.js dev-tools indicator button
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // The apex domain and the escu-site.vercel.app alias both used to serve the
  // full site with a 200, so every page existed at three URLs. Google indexed
  // www (what our canonical tags point at) and filed the rest under "Alternate
  // page with proper canonical tag". Send them all to www with a 308 so there
  // is exactly one crawlable copy.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "everestsuperchemical.com.np" }],
        destination: "https://www.everestsuperchemical.com.np/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "escu-site.vercel.app" }],
        destination: "https://www.everestsuperchemical.com.np/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
