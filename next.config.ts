import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["192.168.0.69", "images.unsplash.com", ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore TypeScript errors during build
  },
  
};

export default nextConfig;
