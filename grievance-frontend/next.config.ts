import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static optimization for pages with client-side logic
  reactStrictMode: true,
  trailingSlash: false,
};

export default nextConfig;
