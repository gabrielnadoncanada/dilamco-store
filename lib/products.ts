import productsData from "./catalog-products.json";
import categoriesData from "./catalog-categories.json";
import { getDescendantSlugs } from "./catalog-categories";
import type { ColorName, Family, Product } from "./types";

interface RawProduct {
  code: string;
  name: string;
  price: number;
  category: string;
  partType?: string;
  w?: number;
  h?: number;
  d?: number;
  doors?: number;
  drawers?: number;
  visible: boolean;
}

interface RawCategory {
  slug: string;
  parent: string | null;
  name: { fr: string | null; en: string | null };
}

const rawCategories = (categoriesData as { categories: RawCategory[] })
  .categories;
const categoryBySlug = new Map<string, RawCategory>(
  rawCategories.map((c) => [c.slug, c]),
);

const familyBySlugCache = new Map<string, Family>();

function familyFromCategory(slug: string): Family {
  const cached = familyBySlugCache.get(slug);
  if (cached) return cached;

  let cursor: string | null = slug;
  const seen = new Set<string>();
  while (cursor && !seen.has(cursor)) {
    seen.add(cursor);
    const node = categoryBySlug.get(cursor);
    if (!node) break;
    if (node.parent === null) {
      const family = (node.name.fr ?? node.slug) as Family;
      familyBySlugCache.set(slug, family);
      return family;
    }
    cursor = node.parent;
  }

  const fallback = slug as Family;
  familyBySlugCache.set(slug, fallback);
  return fallback;
}

function colorsForCode(code: string): ColorName[] {
  return code.endsWith("-muf") ? ["Chêne blanc"] : ["Blanc Pur"];
}

const raw = (productsData as { products: RawProduct[] }).products;

export const products: Product[] = raw
  .filter((p) => p.visible)
  .map<Product>((p) => ({
    id: p.code,
    code: p.code,
    name: p.name,
    price: p.price,
    category: p.category,
    partType: p.partType,
    visible: p.visible,
    family: familyFromCategory(p.category),
    w: p.w ?? 0,
    h: p.h ?? 0,
    d: p.d ?? 0,
    doors: p.doors ?? 1,
    drawers: p.drawers,
    colors: colorsForCode(p.code),
    moldings: ["1 po"],
  }));

const productsByCode = new Map<string, Product>(
  products.map((p) => [p.code, p]),
);

export function findProduct(id: string): Product | undefined {
  return productsByCode.get(id);
}

export function productsInCategory(
  slug: string,
  opts: { deep?: boolean } = {},
): Product[] {
  if (!opts.deep) {
    return products.filter((p) => p.category === slug);
  }
  const slugs = new Set(getDescendantSlugs(slug));
  return products.filter((p) => slugs.has(p.category));
}

const hasVisibleCache = new Map<string, boolean>();
const visibleCategorySlugs = new Set(products.map((p) => p.category));

/** Vrai si la catégorie ou un de ses descendants contient au moins un produit visible. */
export function hasVisibleProducts(slug: string): boolean {
  const cached = hasVisibleCache.get(slug);
  if (cached !== undefined) return cached;
  const result = getDescendantSlugs(slug).some((s) =>
    visibleCategorySlugs.has(s),
  );
  hasVisibleCache.set(slug, result);
  return result;
}

export function swatchSlug(c: string): "blanc" | "chene" | "bleu" {
  if (c === "Blanc Pur") return "blanc";
  if (c === "Chêne blanc") return "chene";
  return "bleu";
}
