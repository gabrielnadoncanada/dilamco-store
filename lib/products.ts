import data from "./products.json";
import type { Product } from "./types";

export const products = data as unknown as Product[];

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function swatchSlug(c: string): "blanc" | "chene" | "bleu" {
  if (c === "Blanc Pur") return "blanc";
  if (c === "Chêne blanc") return "chene";
  return "bleu";
}
