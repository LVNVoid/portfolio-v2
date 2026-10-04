import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'br-rapid-block-b3i6s8r9.storage.c-4.ap-southeast-1.aws.neon.tech',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
