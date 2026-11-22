import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in the parent/home directory
  // otherwise makes Next.js misdetect it as the monorepo root.
  turbopack: {
    root: path.join(__dirname),
  },
  // Pricing was replaced by Packages — keep old links and search results working.
  async redirects() {
    return [{ source: "/pricing", destination: "/packages", permanent: true }];
  },
};

export default nextConfig;
