import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@splinetool/react-spline'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
