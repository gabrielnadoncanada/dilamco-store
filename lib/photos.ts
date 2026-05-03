import type { Product, ColorName } from "./types";

const PH = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PHOTOS = {
  hero: PH("1556909114-f6e7ad7d3136", 1800),
  hero_dark: PH("1583847268964-b28dc8f51f92", 1800),
  hero_warm: PH("1600585154340-be6161a56a0c", 1800),

  wall_blanc: PH("1600210492486-724fe5c67fb0"),
  wall_chene: PH("1565538810643-b5bdb714032a"),
  wall_bleu: PH("1583847268964-b28dc8f51f92"),

  base_blanc: PH("1556909114-f6e7ad7d3136"),
  base_chene: PH("1556912167-f556f1f39fdf"),
  base_bleu: PH("1600585154340-be6161a56a0c"),

  pantry_blanc: PH("1600585154340-be6161a56a0c"),
  pantry_chene: PH("1556912167-f556f1f39fdf"),
  pantry_bleu: PH("1556912173-46c336c7fd55"),

  fridge_blanc: PH("1574180566232-aaad1b5b8450"),
  fridge_chene: PH("1556910103-1c02745aae4d"),
  fridge_bleu: PH("1556912173-46c336c7fd55"),

  corner_blanc: PH("1565538810643-b5bdb714032a"),
  corner_chene: PH("1556912167-f556f1f39fdf"),
  corner_bleu: PH("1556912173-46c336c7fd55"),

  detail_handle: PH("1600121848594-d8644e57abab"),
  detail_grain: PH("1600573472556-e636c2acda88"),
  detail_joint: PH("1600585154526-990dced4db0d"),
  detail_shaker: PH("1565183997392-2f6f122e5912"),

  atelier_1: PH("1581094288338-2314dddb7ece"),
  atelier_2: PH("1504148455328-c376907d081c"),
  atelier_3: PH("1530124566582-a618bc2615dc"),
  atelier_4: PH("1568495248636-6432b97bd949"),

  project_1: PH("1600210492486-724fe5c67fb0"),
  project_2: PH("1600585154340-be6161a56a0c"),
  project_3: PH("1556912167-f556f1f39fdf"),
  project_4: PH("1556912173-46c336c7fd55"),
  project_5: PH("1565538810643-b5bdb714032a"),
  project_6: PH("1574180566232-aaad1b5b8450"),
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
