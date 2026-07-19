import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in the parent/home directory
  // otherwise makes Next.js misdetect it as the monorepo root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
