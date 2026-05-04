import type { Product, ColorName } from "./types";

export const PHOTOS = {
  hero: "/screenshots/01-v2.jpg",
  hero_dark: "/screenshots/03-v2.jpg",
  hero_warm: "/screenshots/05-v2.jpg",

  wall_blanc: "/screenshots/01-v2.jpg",
  wall_chene: "/screenshots/03-v2.jpg",
  wall_bleu: "/screenshots/07-v2.jpg",

  base_blanc: "/screenshots/02-v2.jpg",
  base_chene: "/screenshots/04-v2.jpg",
  base_bleu: "/screenshots/06-v2.jpg",

  pantry_blanc: "/screenshots/01-edito.jpg",
  pantry_chene: "/screenshots/02-edito.jpg",
  pantry_bleu: "/screenshots/03-edito.jpg",

  fridge_blanc: "/screenshots/04-edito.jpg",
  fridge_chene: "/screenshots/05-edito.jpg",
  fridge_bleu: "/screenshots/03-01-current-home.jpg",

  corner_blanc: "/screenshots/01-01-current-home.jpg",
  corner_chene: "/screenshots/02-01-current-home.jpg",
  corner_bleu: "/screenshots/04-01-current-home.jpg",

  detail_handle: "/screenshots/01-check.jpg",
  detail_grain: "/screenshots/02-check.jpg",
  detail_joint: "/screenshots/03-check.jpg",
  detail_shaker: "/screenshots/cat-fixed.jpg",

  atelier_1: "/screenshots/01-cat-broken.jpg",
  atelier_2: "/screenshots/02-cat-broken.jpg",
  atelier_3: "/screenshots/03-cat-broken.jpg",
  atelier_4: "/screenshots/cat-fixed.jpg",

  project_1: "/screenshots/01-v2.jpg",
  project_2: "/screenshots/02-v2.jpg",
  project_3: "/screenshots/03-v2.jpg",
  project_4: "/screenshots/04-v2.jpg",
  project_5: "/screenshots/05-v2.jpg",
  project_6: "/screenshots/06-v2.jpg",
} as const;

export function photoForProduct(product: Product, color?: ColorName): string {
  const picked = color || product.colors[0];
  const c =
    picked === "Blanc Pur"
      ? "blanc"
      : picked === "Chêne blanc"
      ? "chene"
      : "bleu";
  const fam = product.family;
  if (fam === "Armoire murale" || fam === "Armoire murale de coin")
    return PHOTOS[`wall_${c}` as keyof typeof PHOTOS];
  if (fam === "Armoire de bas" || fam === "Armoire de bas de coin")
    return PHOTOS[`base_${c}` as keyof typeof PHOTOS];
  if (fam === "Garde-manger") return PHOTOS[`pantry_${c}` as keyof typeof PHOTOS];
  if (fam === "Armoire au-dessus du réfrigérateur")
    return PHOTOS[`fridge_${c}` as keyof typeof PHOTOS];
  return PHOTOS[`wall_${c}` as keyof typeof PHOTOS];
}

export function inSituFor(product: Product): string[] {
  const fam = product.family;
  if (fam.includes("Garde-manger"))
    return [PHOTOS.pantry_chene, PHOTOS.detail_grain, PHOTOS.atelier_2];
  if (fam.includes("coin"))
    return [PHOTOS.corner_blanc, PHOTOS.detail_joint, PHOTOS.atelier_3];
  if (fam.includes("bas"))
    return [PHOTOS.base_blanc, PHOTOS.detail_handle, PHOTOS.atelier_1];
  return [PHOTOS.wall_blanc, PHOTOS.detail_shaker, PHOTOS.atelier_4];
}
