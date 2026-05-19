import type { ColorName, Family, Molding } from "@/lib/types";

export const FAMILY_ORDER: Family[] = [
  "Armoire murale",
  "Armoire de bas",
  "Garde-manger",
  "Armoire au-dessus du réfrigérateur",
  "Armoire murale de coin",
  "Armoire de bas de coin",
  "Garde-manger de coin",
];
export const COLORS_ALL: ColorName[] = ["Blanc Pur", "Chêne blanc", "Bleu marin"];
export const MOLDINGS_ALL: Molding[] = ["1 po", "3 po"];
export const CEILINGS_ALL = ["8 pi", "9 pi"];

export type CornerFilter = "all" | "straight" | "corner";
export type SortKey = "family" | "price-asc" | "price-desc" | "width";

export interface Filters {
  families: Family[];
  colors: ColorName[];
  moldings: Molding[];
  ceilings: string[];
  corner: CornerFilter;
  sort: SortKey;
}

export type ToggleArr = <K extends "families" | "colors" | "moldings" | "ceilings">(
  key: K,
  value: Filters[K][number],
) => void;
