import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.1.22:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
