import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // hide the little Next.js dev-tools indicator button
  devIndicators: false,
};

export default nextConfig;
