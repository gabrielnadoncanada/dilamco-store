export type ColorName = "Blanc Pur" | "Chêne blanc" | "Bleu marin";
export type Molding = "1 po" | "3 po";
export type Ceiling = "8 pi" | "9 pi" | string;
export type Corner = "Non" | "Coin 45 degres" | "Coin 90 degres" | string;

export type Family =
  | "Armoire murale"
  | "Armoire de bas"
  | "Garde-manger"
  | "Armoire au-dessus du réfrigérateur"
  | "Armoire murale de coin"
  | "Armoire de bas de coin"
  | "Garde-manger de coin"
  | string;

/** Une entrée galerie : chemin uniquement ou objet avec libellé optionnel. */
export type ProductGalleryEntry = string | { src: string; label?: string };

export interface Product {
  /** Alias historique de `code` — gardé pour rétrocompatibilité des composants. */
  id: string;
  /** Code produit canonique (Yihai), source: catalog-products.json. */
  code: string;
  name: string;
  /** Famille FR dérivée du top-parent de `category` via catalog-categories.json. */
  family: Family;
  /** Slug catégorie complet (ex. "base-cabinet-standard"). */
  category: string;
  /** Partie d'un cabinet complet (ex. "complete-cabinet"). Optionnel. */
  partType?: string;
  cat?: string;
  w: number;
  d: number;
  h: number;
  ceiling?: Ceiling;
  corner?: Corner;
  doors: number;
  drawers?: number;
  colors: ColorName[];
  moldings: Molding[];
  price: number;
  /** false si l'auteur Excel n'a pas marqué la ligne comme "certaine" avec prix. */
  visible: boolean;
  /** Si défini et non vide, chemins pour la galerie produit ; sinon les placeholders locaux du catalogue (`wall_cabinet_*.png`). */
  gallery?: ProductGalleryEntry[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  family: Family;
  price: number;
  w: number;
  h: number;
  d: number;
  color: ColorName;
  molding: Molding;
  qty: number;
}

export interface Tweaks {
  theme: "default" | "warm" | "ink";
  density: "comfy" | "dense";
  showPrices: boolean;
  serif: string;
  sans: string;
}
