import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // GitHub Pages for this repo is served from https://<user>.github.io/JCIE/
  basePath: '/JCIE',
  // Ensure exported HTML references JS/CSS under /JCIE/_next instead of /_next
  assetPrefix: '/JCIE/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
