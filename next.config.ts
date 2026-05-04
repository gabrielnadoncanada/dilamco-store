import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/collections", destination: "/finitions", permanent: true },
      {
        source: "/collections/:path*",
        destination: "/finitions/:path*",
        permanent: true,
      },
    ];
  },
};

export default config;
