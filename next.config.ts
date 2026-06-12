import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    // AVIF d'abord (≈20-30 % plus léger que WebP), WebP en repli — le
    // navigateur ne reçoit jamais le PNG/JPG source.
    formats: ["image/avif", "image/webp"],
    // Les renders catalogue sont immuables (régénérés sous le même nom
    // seulement si le produit change) : cache CDN/navigateur 1 an.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  async headers() {
    return [
      {
        // Assets versionnés par leur contenu (renders, photos) : par défaut
        // Next sert public/ avec max-age=0 → revalidation à chaque visite.
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default config;
