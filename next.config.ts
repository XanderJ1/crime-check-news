import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['biztoc.com', 'example.com', 'another-domain.com', 'newsdata.io', 'placehold.co', 'images.prismic.io'], // add all allowed hosts
  },
};

export default nextConfig;
