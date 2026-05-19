import data from "./catalog-categories.json";

export type Locale = "fr" | "en";

export interface Bilingual {
  fr: string | null;
  en: string | null;
}

export interface Subcategory {
  name: Bilingual;
  slug: Bilingual;
}

export interface Category {
  name: Bilingual;
  slug: Bilingual;
  subcategories: Subcategory[];
}

interface CatalogCategoriesFile {
  source: string;
  categories: Category[];
}

const file = data as CatalogCategoriesFile;

export const categories: Category[] = file.categories;

export function findCategoryBySlug(
  slug: string,
  locale: Locale = "fr",
): Category | undefined {
  return categories.find((c) => c.slug[locale] === slug);
}

export function findSubcategoryBySlug(
  category: Category,
  slug: string,
  locale: Locale = "fr",
): Subcategory | undefined {
  return category.subcategories.find((s) => s.slug[locale] === slug);
}
