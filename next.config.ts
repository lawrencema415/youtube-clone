import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  assetPrefix: process.env.NGROK_URL || '', // Use ngrok URL if needed
};

export default nextConfig;
