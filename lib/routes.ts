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

export const collectionsFilter = {
  family: (value: string) =>
    `${routes.collections}?famille=${encodeURIComponent(value)}`,
  color: (value: string) =>
    `${routes.collections}?couleur=${encodeURIComponent(value)}`,
  corner: `${routes.collections}?coin=corner`,
} as const;

export const pathPrefixes = {
  product: "/produit",
} as const;
