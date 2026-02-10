import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/column",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/column/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
