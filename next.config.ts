import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/portfolio' : '',
  assetPrefix: isProd ? '/portfolio' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
