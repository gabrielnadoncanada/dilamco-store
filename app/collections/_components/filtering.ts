import { products as ALL_PRODUCTS, productsInCategory } from "@/lib/products";
import type { Product } from "@/lib/types";

export const FINISH_VALUES = ["blanc", "chene"] as const;
export type FinishKey = (typeof FINISH_VALUES)[number];

export interface CatalogScope {
  slug: string;
  deep?: boolean;
}

export interface FilterState {
  q: string;
  width: number | null;
  finish: FinishKey | null;
}

/** Minuscules + sans accents, pour une recherche tolérante (chene = chêne). */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Liste de base d'une page : catégorie (profonde ou non) ou tout le catalogue. */
export function baseProducts(scope?: CatalogScope): Product[] {
  if (!scope) return ALL_PRODUCTS;
  return productsInCategory(scope.slug, { deep: scope.deep ?? false });
}

function matchesFinish(p: Product, finish: FinishKey | null): boolean {
  if (finish === null) return true;
  return finish === "chene" ? p.code.endsWith("-muf") : !p.code.endsWith("-muf");
}

function matchesQuery(p: Product, needle: string): boolean {
  if (!needle) return true;
  return (
    normalize(p.name).includes(needle) ||
    normalize(p.code).includes(needle) ||
    normalize(p.sku ?? "").includes(needle)
  );
}

/**
 * Applique les filtres. `skip` permet le facettage à la Amazon : les
 * compteurs d'une facette sont calculés avec toutes les AUTRES facettes
 * actives, jamais avec elle-même.
 */
export function applyFilters(
  list: Product[],
  state: FilterState,
  skip?: "width" | "finish",
): Product[] {
  const needle = normalize(state.q.trim());
  return list.filter((p) => {
    if (skip !== "width" && state.width !== null && p.w !== state.width) {
      return false;
    }
    if (skip !== "finish" && !matchesFinish(p, state.finish)) return false;
    return matchesQuery(p, needle);
  });
}
