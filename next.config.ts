import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '127.0.0.1'], // Add any other domains you might use for images
  },
};

export default nextConfig;
