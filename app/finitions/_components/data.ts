export interface Collection {
  id: string;
  code: string;
  nom: string;
  /** Accroches sous le titre (une ligne = une puce) */
  taglines: string[];
  desc: string;
  matiere: string;
  rgb: string;
  veinage: string;
  /** Si définit, remplace la grille Matière / Référence / Veinage */
  specs?: Array<{ label: string; value: string }>;
  usage: string;
  ambient: string;
  detail: string;
  bgColor: string;
  swColor: string;
  pourcentage: string;
  pourcentage_lbl: string;
  /** Texte du bouton catalogue (défaut : « Voir les {nom} ») */
  primaryCta?: string;
  /** Bouton secondaire (défaut : échantillon / soumission) */
  secondaryCta?: { label: string; href: string };
}

export const COLLECTIONS: Collection[] = [
  {
    id: "blanc-pur",
    code: "C.01",
    nom: "Blanc Pur",
    taglines: ["Classique et lumineux"],
    desc:
      "Plus de la moitié des projets Dilamco partent du Blanc Pur. Il s'efface au profit de la lumière, du comptoir, de la pièce. Un blanc neutre légèrement chaud, catalysé deux couches.",
    matiere: "Blanc opaque catalysé · Sheen 25%",
    rgb: "NCS S 0500-N",
    veinage: "Aucun",
    specs: [
      { label: "Caisson", value: "Contreplaqué" },
      { label: "Porte", value: "HDF laqué + Bouleau" },
      { label: "Moulure", value: "1 et 3 pouces disponible" },
    ],
    usage: "",
    primaryCta: "Voir les Blanc Pur",
    secondaryCta: {
      label: "Voir la salle de montre",
      href: "/soumission",
    },
    ambient:
      "/assets/finitions_blanc.webp",
    detail:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    bgColor: "#f5f1e8",
    swColor: "#f3efe6",
    pourcentage: "54%",
    pourcentage_lbl: "des projets 2024",
  },
  {
    id: "chene-blanc",
    code: "C.02",
    nom: "Chêne blanc",
    taglines: ["Plus chaleureux, style bois"],
    desc:
      "Placage bouleau teinté chêne. Le veinage horizontal, l'élégance qu'on demande sans pouvoir la nommer. Idéal en îlot ou mur d'accent.",
    matiere: "Placage bouleau · Teinture aqueuse · Vernis mat 10%",
    rgb: "Pantone 7503 C (référence)",
    veinage: "Horizontal continu",
    specs: [
      { label: "Caisson", value: "Contreplaqué" },
      {
        label: "Porte",
        value: "Placage bouleau teinté chêne · Vernis mat · Veinage horizontal",
      },
      { label: "Moulure", value: "1 et 3 pouces disponible" },
    ],
    usage: "",
    primaryCta: "Voir le Chêne blanc",
    secondaryCta: {
      label: "Voir la salle de montre",
      href: "/soumission",
    },
    ambient:
      "/assets/finitions_chene.webp",
    detail:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80",
    bgColor: "#c9a56e",
    swColor: "#c9b48a",
    pourcentage: "31%",
    pourcentage_lbl: "des projets 2024",
  },
  {
    id: "bleu-marin",
    code: "C.03",
    nom: "Bleu marin",
    taglines: ["Plus audacieux, accent moderne"],
    desc:
      "Un bleu profond catalysé. Pour les projets qui assument une couleur — souvent en bas, jumelé avec un haut Blanc Pur. Tient son ton sous lumière chaude comme froide.",
    matiere: "Opaque catalysé · Sheen 25% · 4 couches",
    rgb: "Farrow & Ball · Hague Blue (référence)",
    veinage: "Aucun",
    specs: [
      { label: "Caisson", value: "Contreplaqué" },
      { label: "Porte", value: "HDF laqué catalysé · Sheen 25% · 4 couches" },
      { label: "Moulure", value: "1 et 3 pouces disponible" },
    ],
    usage: "",
    primaryCta: "Voir le Bleu marin",
    secondaryCta: {
      label: "Voir la salle de montre",
      href: "/soumission",
    },
    ambient:
      "/assets/finitions_bleu.webp",
    detail:
      "https://images.unsplash.com/photo-1556910589-129022a4b1c4?auto=format&fit=crop&w=1200&q=80",
    bgColor: "#1f3245",
    swColor: "#2a3d52",
    pourcentage: "15%",
    pourcentage_lbl: "des projets 2024",
  },
];

export const COMPARE_ROWS: string[][] = [
  ["Cuisine entière", "Recommandé", "Bon en îlot", "À éviter"],
  ["Bicolore", "Hauts", "Îlot", "Bas"],
  ["Plafond 8 pi", "✓", "✓", "✓ avec haut clair"],
  ["Plafond 9 pi", "✓", "✓", "✓"],
  ["Lumière nordique", "★", "★", "★"],
  ["Sud / chaud", "★", "★", "○ (bleu vire mat)"],
  ["Comptoir bois", "★", "○", "★"],
  ["Comptoir marbre", "★", "★", "★"],
];
