export interface Collection {
  id: string;
  code: string;
  nom: string;
  sous: string;
  desc: string;
  matiere: string;
  rgb: string;
  veinage: string;
  usage: string;
  ambient: string;
  detail: string;
  bgColor: string;
  swColor: string;
  pourcentage: string;
  pourcentage_lbl: string;
}

export const COLLECTIONS: Collection[] = [
  {
    id: "blanc-pur",
    code: "C.01",
    nom: "Blanc Pur",
    sous: "La référence neutre",
    desc:
      "Plus de la moitié des projets Dilamco partent du Blanc Pur. Il s'efface au profit de la lumière, du comptoir, de la pièce. Un blanc neutre légèrement chaud, catalysé deux couches.",
    matiere: "Blanc opaque catalysé · Sheen 25%",
    rgb: "NCS S 0500-N",
    veinage: "Aucun",
    usage:
      "Idéal en cuisine complète, ouverte sur séjour. Compatible avec tous les comptoirs (marbre, quartz, bois, acier).",
    ambient:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80",
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
    sous: "L'élégance scandinave",
    desc:
      "Placage bouleau teinté chêne. Le veinage horizontal, l'élégance qu'on demande sans pouvoir la nommer. Idéal en îlot ou mur d'accent.",
    matiere: "Placage bouleau · Teinture aqueuse · Vernis mat 10%",
    rgb: "Pantone 7503 C (référence)",
    veinage: "Horizontal continu",
    usage:
      "Parfait sur îlot central, mur de garde-mangers, ou en bicolore avec Blanc Pur sur les hauts.",
    ambient:
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=2000&q=80",
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
    sous: "L'affirmation chromatique",
    desc:
      "Un bleu profond catalysé. Pour les projets qui assument une couleur — souvent en bas, jumelé avec un haut Blanc Pur. Tient son ton sous lumière chaude comme froide.",
    matiere: "Opaque catalysé · Sheen 25% · 4 couches",
    rgb: "Farrow & Ball · Hague Blue (référence)",
    veinage: "Aucun",
    usage:
      "Tient le mieux en bas (armoires de bas + îlot). Évitez la cuisine entièrement bleue : la pièce devient lourde.",
    ambient:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80",
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
