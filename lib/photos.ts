import type { Product, ColorName, ProductGalleryEntry } from "./types";

const DEFAULT_GALLERY_LABELS = ["Atelier", "Ambiance", "Détail · Moulure"] as const;

const FALLBACK_PRODUCT_GALLERY_SRCS = [
  "/assets/products/wall_cabinet_3.webp",
  "/assets/products/wall_cabinet_1.webp",
  "/assets/products/wall_cabinet_2.webp",
] as const;

function gallerySrc(entry: ProductGalleryEntry): string {
  return typeof entry === "string" ? entry : entry.src;
}

function galleryLabel(entry: ProductGalleryEntry, index: number): string {
  if (typeof entry !== "string" && entry.label) return entry.label;
  return DEFAULT_GALLERY_LABELS[index] ?? `Vue ${index + 1}`;
}

export function photoForProduct(product: Product, _color?: ColorName): string {
  const firstGallery = product.gallery?.[0];
  if (firstGallery) return gallerySrc(firstGallery);
  return FALLBACK_PRODUCT_GALLERY_SRCS[0];
}

export function inSituFor(_product: Product): string[] {
  return [...FALLBACK_PRODUCT_GALLERY_SRCS];
}

/** Vues carousel / lightbox : `product.gallery` si renseigné, sinon placeholders locaux historiques. */
export function productGalleryViews(product: Product): Array<{
  type: "photo";
  src: string;
  label: string;
}> {
  const custom = product.gallery;
  if (custom?.length) {
    return custom.map((entry, i) => ({
      type: "photo" as const,
      src: gallerySrc(entry),
      label: galleryLabel(entry, i),
    }));
  }
  return FALLBACK_PRODUCT_GALLERY_SRCS.map((src, i) => ({
    type: "photo" as const,
    src,
    label: DEFAULT_GALLERY_LABELS[i] ?? `Vue ${i + 1}`,
  }));
}
