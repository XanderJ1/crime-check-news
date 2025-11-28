import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output configuration for Vercel
  output: 'standalone',

  // Image optimization with remotePatterns (replaces deprecated domains)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'biztoc.com',
      },
      {
        protocol: 'https',
        hostname: 'newsdata.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Server-side rendering is enabled by default in Next.js App Router
  // All your pages are already using SSR with async Server Components
};

export default nextConfig;
