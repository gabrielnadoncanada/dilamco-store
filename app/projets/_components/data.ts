export interface Project {
  id: string;
  ville: string;
  titre: string;
  annee: string;
  surface: string;
  budget: string;
  duree: string;
  modules: number;
  fini: string;
  plafond: string;
  hero: string;
  galerie: string[];
  citation: string;
  auteur: string;
  architecte: string;
}

export const PROJECTS: Project[] = [
  {
    id: "outremont",
    ville: "Outremont",
    titre: "Une cuisine d'angle dans une maison de 1932.",
    annee: "2024",
    surface: "42 m²",
    budget: "58 000 $",
    duree: "11 jours",
    modules: 38,
    fini: "Blanc Pur · Shaker 3 po",
    plafond: "9 pi",
    hero: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80",
    galerie: [
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556910638-7066ad26d4f0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556910589-129022a4b1c4?auto=format&fit=crop&w=900&q=80",
    ],
    citation:
      "Trois soumissions, trois déceptions. Dilamco a été le seul à nous remettre un prix ferme sous deux jours.",
    auteur: "Mireille L. · propriétaire",
    architecte: "Atelier Pierre Thibault",
  },
  {
    id: "westmount",
    ville: "Westmount",
    titre: "Penthouse contemporain, îlot bleu marin.",
    annee: "2024",
    surface: "54 m²",
    budget: "78 000 $",
    duree: "14 jours",
    modules: 52,
    fini: "Bleu marin + Blanc Pur · Shaker 1 po",
    plafond: "9 pi",
    hero: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80",
    galerie: [
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909211-36987daf7b4f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=900&q=80",
    ],
    citation:
      "Le bicolore est piégeux à exécuter. Le fait que tout vienne d'une seule usine se sent au montage : zéro écart de teinte.",
    auteur: "Jean-François D. · architecte",
    architecte: "Naturehumaine",
  },
  {
    id: "plateau",
    ville: "Plateau Mont-Royal",
    titre: "Triplex centenaire, cuisine en U compacte.",
    annee: "2023",
    surface: "28 m²",
    budget: "42 000 $",
    duree: "9 jours",
    modules: 24,
    fini: "Chêne blanc · Shaker 1 po",
    plafond: "8 pi",
    hero: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=2000&q=80",
    galerie: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
    ],
    citation:
      "Plafond 8 pi, donc on a poussé le mur jusqu'au plafond. Le bouleau teinté chêne tient ses promesses sur la durée.",
    auteur: "Sophie B. · designer d'intérieur",
    architecte: "la Shed Architecture",
  },
];

export const ARCHIVE = [
  { v: "Île-des-Sœurs", m: "36 m²", b: "52k" },
  { v: "Rosemont", m: "32 m²", b: "45k" },
  { v: "Verdun", m: "38 m²", b: "49k" },
  { v: "Hampstead", m: "48 m²", b: "68k" },
  { v: "Mile-End", m: "24 m²", b: "34k" },
  { v: "Saint-Lambert", m: "40 m²", b: "54k" },
  { v: "NDG", m: "30 m²", b: "41k" },
  { v: "Boucherville", m: "46 m²", b: "64k" },
];
