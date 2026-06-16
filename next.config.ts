import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // Static HTML export for GitHub Pages
  trailingSlash: true,   // Needed for GH Pages routing
  images: {
    unoptimized: true,   // Required for static export
  },
  // No basePath needed: repo is breynerciro.github.io (user site → root URL)
};

export default nextConfig;
