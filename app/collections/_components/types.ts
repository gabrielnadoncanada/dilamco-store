import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";
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
export const CEILINGS_ALL = ["8 pi", "9 pi"] as const;

export const CORNER_VALUES = ["all", "straight", "corner"] as const;
export type CornerFilter = (typeof CORNER_VALUES)[number];

export const SORT_VALUES = [
  "family",
  "price-asc",
  "price-desc",
  "width",
] as const;
export type SortKey = (typeof SORT_VALUES)[number];

export const collectionsFiltersParsers = {
  families: parseAsArrayOf(parseAsString).withDefault([]),
  colors: parseAsArrayOf(parseAsString).withDefault([]),
  moldings: parseAsArrayOf(parseAsString).withDefault([]),
  ceilings: parseAsArrayOf(parseAsString).withDefault([]),
  corner: parseAsStringLiteral(CORNER_VALUES).withDefault("all"),
  sort: parseAsStringLiteral(SORT_VALUES).withDefault("family"),
};

export const collectionsFiltersUrlKeys = {
  families: "famille",
  colors: "couleur",
  moldings: "moulure",
  ceilings: "plafond",
  corner: "coin",
  sort: "tri",
} as const;

export function useCollectionsFilters() {
  return useQueryStates(collectionsFiltersParsers, {
    urlKeys: collectionsFiltersUrlKeys,
  });
}

export type Filters = {
  families: Family[];
  colors: ColorName[];
  moldings: Molding[];
  ceilings: string[];
  corner: CornerFilter;
  sort: SortKey;
};

export type FilterArrayKey = "families" | "colors" | "moldings" | "ceilings";
export type ToggleArr = <K extends FilterArrayKey>(
  key: K,
  value: Filters[K][number],
) => void;
