import type { Family } from "@/lib/types";

/**
 * Ordre marchand des familles (top-parents FR de catalog-categories.json).
 * Les familles absentes de cette liste sont triées en dernier — garder en
 * tête de liste les caissons, en queue les accessoires de finition.
 */
export const FAMILY_ORDER: Family[] = [
  "Armoire du bas",
  "Armoire murale",
  "Armoire utilitaire",
  "Fausse porte",
  "Panneau",
  "Fillers, panneaux & moulures",
];

/** Rang de tri d'une famille : inconnue → après toutes les familles connues. */
export function familyRank(family: Family): number {
  const idx = FAMILY_ORDER.indexOf(family);
  return idx === -1 ? FAMILY_ORDER.length : idx;
}

/** Titres d'affichage au pluriel — les noms du catalogue sont au singulier. */
export const PLURAL_TITLES: Record<string, string> = {
  "Armoire du bas": "Armoires du bas",
  "Armoire murale": "Armoires murales",
  "Armoire utilitaire": "Armoires utilitaires",
  "Fausse porte": "Fausses portes",
  Panneau: "Panneaux",
};

export function pluralTitle(name: string): string {
  return PLURAL_TITLES[name] ?? name;
}

export const SORT_VALUES = [
  "family",
  "price-asc",
  "price-desc",
  "width",
] as const;
export type SortKey = (typeof SORT_VALUES)[number];
