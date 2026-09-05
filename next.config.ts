import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  // If it's a top-level property in Next.js 15
  allowedDevOrigins: ['192.168.1.114', '192.168.1.7'],
  eslint: {
    ignoreDuringBuilds: true,
  },
} as unknown as NextConfig;

export default nextConfig;
