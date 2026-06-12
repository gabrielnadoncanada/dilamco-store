import data from "./catalog-categories.json";

export type Locale = "fr" | "en";

export interface Bilingual {
  fr: string | null;
  en: string | null;
}

export interface Category {
  slug: string;
  slugFr: string;
  parent: string | null;
  name: Bilingual;
  path: string[];
}

interface CatalogCategoriesFile {
  source: string;
  categories: Category[];
}

const file = data as CatalogCategoriesFile;

export const categories: Category[] = file.categories;

const bySlug = new Map<string, Category>(categories.map((c) => [c.slug, c]));
const childrenByParent = new Map<string, Category[]>();
for (const cat of categories) {
  const key = cat.parent ?? "__root__";
  const list = childrenByParent.get(key) ?? [];
  list.push(cat);
  childrenByParent.set(key, list);
}

export function findCategoryBySlug(slug: string): Category | undefined {
  return bySlug.get(slug);
}

export function getTopLevelCategories(): Category[] {
  return childrenByParent.get("__root__") ?? [];
}

export function getChildren(parentSlug: string): Category[] {
  return childrenByParent.get(parentSlug) ?? [];
}

/** Inclut le slug fourni + tous ses descendants. Utile pour matcher les produits dans une famille entière. */
export function getDescendantSlugs(slug: string): string[] {
  const out = [slug];
  const queue = [slug];
  while (queue.length) {
    const cur = queue.shift()!;
    for (const child of getChildren(cur)) {
      out.push(child.slug);
      queue.push(child.slug);
    }
  }
  return out;
}

/** Corrections d'affichage pour les trous de catalog.xlsx (nom = slug brut). */
const NAME_OVERRIDES: Record<string, string> = {
  "wall-cabinet-microwave": "Micro-ondes",
};

export function categoryName(cat: Category, locale: Locale = "fr"): string {
  const name = cat.name[locale] ?? cat.name.en ?? cat.slug;
  // Un nom identique au slug est un trou de données, pas un nom.
  if (name === cat.slug) {
    return NAME_OVERRIDES[cat.slug] ?? name;
  }
  return name;
}
