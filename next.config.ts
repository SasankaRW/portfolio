import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/basketball-score-board/:path*',
        destination: 'https://basketball-score-board-tau.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
