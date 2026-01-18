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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Compression enabled by default in Next.js
  compress: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },

  // Server-side rendering is enabled by default in Next.js App Router
  // All your pages are already using SSR with async Server Components
};

export default nextConfig;
