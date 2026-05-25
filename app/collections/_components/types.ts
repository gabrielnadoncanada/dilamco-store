import type { Family } from "@/lib/types";

export const FAMILY_ORDER: Family[] = [
  "Armoire de bas",
  "Armoire murale",
  "Armoire utilitaire",
  "Armoire de salle de bain",
  "Coin aveugle mural",
  "Coin aveugle mural haut",
  "Coin aveugle gauche",
  "Armoire micro-ondes de bas",
  "Fausse porte",
  "Fausse porte murale",
  "Fausse porte murale/garde-manger",
  "Panneau",
  "Panneau d'extrémité mural",
  "Panneau arrière d'îlot",
  "Panneau d'habillage d'îlot",
  "Moulures",
  "Remplissages",
  "Plinthe",
  "Côté dessous tiroir",
  "Accessoires",
  "Charnière style américain",
];

export const SORT_VALUES = [
  "family",
  "price-asc",
  "price-desc",
  "width",
] as const;
export type SortKey = (typeof SORT_VALUES)[number];
