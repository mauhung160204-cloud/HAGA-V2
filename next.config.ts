import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.search.yahoo.com', // Cấp phép thêm cho link ảnh từ Yahoo
      },
    ],
  },
};

export default nextConfig;