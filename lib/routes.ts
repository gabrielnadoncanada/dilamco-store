export const routes = {
  home: "/",
  collections: "/collections",
  collection: (slug: string) => `/collections/${slug}`,
  subcollection: (slug: string, sub: string) =>
    `/collections/${slug}/${sub}`,
  finishes: "/finitions",
  quote: "/soumission",
  projects: "/projets",
  configurator: "/configurateur",
  package: (slug: string) => `/forfait/${slug}`,
  product: (id: string) => `/produit/${encodeURIComponent(id)}`,
} as const;

/**
 * Helpers historiques — redirigés vers les pages catégorie de la nouvelle navigation.
 * Le filtrage par couleur/coin n'existe plus ; ces appels tombent sur l'index global.
 */
import {
  getTopLevelCategories,
  type Category,
} from "./catalog-categories";

const slugByFamilyName = new Map<string, string>(
  getTopLevelCategories()
    .filter((c: Category) => c.name.fr)
    .map((c: Category) => [c.name.fr as string, c.slug]),
);

export const collectionsFilter = {
  family: (value: string) => {
    const slug = slugByFamilyName.get(value);
    return slug ? routes.collection(slug) : routes.collections;
  },
  color: (_value: string) => routes.collections,
  corner: routes.collections,
} as const;

export const pathPrefixes = {
  product: "/produit",
} as const;
