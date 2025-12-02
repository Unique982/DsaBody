import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "pixabay.com",
      "cdn.pixabay.com",
      "images.unsplash.com",
      "i.imgur.com",
      "example.com", // add more if needed
    ],
  },
};

export default nextConfig;
