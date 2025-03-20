import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nlytical.theprimocys.com",
        pathname: "/assets/images/users_images/**", // ✅ User images
      },
      {
        protocol: "https",
        hostname: "nlytical.theprimocys.com",
        pathname: "/assets/images/service_images/**", // ✅ Service images
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  reactStrictMode: true,
};

export default nextConfig;
