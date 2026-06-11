import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:lang(en|fr|es)/ads.txt',
        destination: '/ads.txt',
      },
      {
        source: '/:lang(en|fr|es)/sitemap.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
};

export default nextConfig;
