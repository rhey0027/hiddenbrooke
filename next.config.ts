import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://bwsuzrmhpsllbponvfgb.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  turbopack: {},
};
export default withPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
