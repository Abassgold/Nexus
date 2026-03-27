import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'accszone.com',
        port: '',
        pathname: '/uploads/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
