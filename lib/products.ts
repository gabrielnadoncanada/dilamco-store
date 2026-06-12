import productsData from "./catalog-products.json";
import categoriesData from "./catalog-categories.json";
import renderManifest from "./render-manifest.json";
import { getDescendantSlugs } from "./catalog-categories";
import type { ColorName, Family, Product, ProductGalleryEntry } from "./types";

interface RawProduct {
  code: string;
  name: string;
  shortName?: string;
  externalCode?: string;
  sku?: string;
  finish?: string;
  price: number;
  category: string;
  partType?: string;
  w?: number;
  h?: number;
  d?: number;
  doors?: number;
  drawers?: number;
  visible: boolean;
}

interface RawCategory {
  slug: string;
  parent: string | null;
  name: { fr: string | null; en: string | null };
}

const rawCategories = (categoriesData as { categories: RawCategory[] })
  .categories;
const categoryBySlug = new Map<string, RawCategory>(
  rawCategories.map((c) => [c.slug, c]),
);

const familyBySlugCache = new Map<string, Family>();

function familyFromCategory(slug: string): Family {
  const cached = familyBySlugCache.get(slug);
  if (cached) return cached;

  let cursor: string | null = slug;
  const seen = new Set<string>();
  while (cursor && !seen.has(cursor)) {
    seen.add(cursor);
    const node = categoryBySlug.get(cursor);
    if (!node) break;
    if (node.parent === null) {
      const family = (node.name.fr ?? node.slug) as Family;
      familyBySlugCache.set(slug, family);
      return family;
    }
    cursor = node.parent;
  }

  const fallback = slug as Family;
  familyBySlugCache.set(slug, fallback);
  return fallback;
}

const KNOWN_COLORS: ColorName[] = ["Blanc Pur", "Chêne blanc", "Bleu marin"];

function colorsFor(p: RawProduct): ColorName[] {
  if (p.finish && KNOWN_COLORS.includes(p.finish as ColorName)) {
    return [p.finish as ColorName];
  }
  return p.code.endsWith("-muf") ? ["Chêne blanc"] : ["Blanc Pur"];
}

const raw = (productsData as { products: RawProduct[] }).products;

/** Vrai si le nom du catalogue est un code technique (ex. « W0930 », « WP129327 »). */
function isTechnicalName(name: string): boolean {
  return /^[A-Z]{1,4}[0-9]/.test(name);
}

/**
 * Noms d'affichage FR pour les 122 produits dont catalog.xlsx ne fournit
 * qu'un code technique. Le nom long sert de titre de fiche ; le court, de
 * titre de carte. Les largeurs sœurs partagent le même nom long (le
 * regroupement de variantes s'appuie dessus).
 */
function deriveNames(p: RawProduct): { name: string; shortName?: string } {
  if (!isTechnicalName(p.name)) return { name: p.name, shortName: p.shortName };

  const w = p.w ?? 0;
  const h = p.h ?? 0;
  const dims = `${w}″ × ${h}″`;
  const isDoor = p.code.includes("-Door");

  switch (p.category) {
    case "wall-cabinet-standard": {
      if (isDoor) {
        return {
          name: `Porte de remplacement pour armoire murale ${dims}`,
          shortName: `Porte murale ${dims}`,
        };
      }
      const doors = (p.doors ?? 1) >= 2 ? "2 portes" : "1 porte";
      return {
        name: `Armoire murale ${doors} · ${h} po de haut`,
        shortName: `Murale ${doors} (${dims})`,
      };
    }
    case "wall-cabinet-microwave":
      return {
        name: `Armoire murale pour micro-ondes · ${h} po de haut`,
        shortName: `Micro-ondes (${dims})`,
      };
    case "wall-cabinet-corner-45deg":
      if (isDoor) {
        return {
          name: `Porte de remplacement pour armoire de coin 45° ${dims}`,
          shortName: `Porte coin 45° ${dims}`,
        };
      }
      return {
        name: `Armoire murale de coin 45° · ${h} po de haut`,
        shortName: `Coin mural 45° (${dims})`,
      };
    case "utility-cabinet-pantry":
      return {
        name: `Garde-manger 2 portes · ${h} po de haut`,
        shortName: `Garde-manger (${dims})`,
      };
    case "fillers-base-wall-tall-filler":
      return {
        name: `Filler ${w}″ × ${h}″`,
        shortName: `Filler ${dims}`,
      };
    case "dummy-door-base-end":
      return {
        name: `Fausse porte d'extrémité ${dims}`,
        shortName: `Fausse porte ${dims}`,
      };
    case "moldings-outside-corner-molding":
      return {
        name: `Moulure de coin extérieur ${w} po`,
        shortName: `Moulure de coin ${w} po`,
      };
    case "panel-refrigerator-return-panel":
      return {
        name: `Panneau de retour réfrigérateur ${h} po`,
        shortName: `Panneau réfrigérateur ${h} po`,
      };
    case "toe-kick":
      return {
        name: `Plinthe (toe kick) ${h} po`,
        shortName: `Plinthe ${h} po`,
      };
    default:
      return { name: p.name, shortName: p.shortName };
  }
}

/** Rendus Blender par code SKU exact (généré par dilamco_render/scripts/batch_render_catalog.py). */
const rendersByCode = (
  renderManifest as {
    products: Record<string, { face?: string; technique?: string }>;
  }
).products;

function galleryFor(code: string): ProductGalleryEntry[] | undefined {
  const render = rendersByCode[code];
  if (!render?.face) return undefined;
  const entries: ProductGalleryEntry[] = [
    { src: render.face, label: "Produit" },
  ];
  if (render.technique) {
    entries.push({ src: render.technique, label: "Dessin technique" });
  }
  return entries;
}

export const products: Product[] = raw
  .filter((p) => p.visible)
  .map<Product>((p) => ({
    id: p.code,
    code: p.code,
    ...deriveNames(p),
    sku: p.sku,
    price: p.price,
    category: p.category,
    partType: p.partType,
    visible: p.visible,
    family: familyFromCategory(p.category),
    w: p.w ?? 0,
    h: p.h ?? 0,
    d: p.d ?? 0,
    doors: p.doors ?? 0,
    drawers: p.drawers,
    colors: colorsFor(p),
    moldings: ["1 po"],
    gallery: galleryFor(p.code),
  }));

const productsByCode = new Map<string, Product>(
  products.map((p) => [p.code, p]),
);

export function findProduct(id: string): Product | undefined {
  return productsByCode.get(id);
}

const FLAT_PART_PREFIXES = [
  "fillers",
  "dummy-door",
  "panel",
  "toe-kick",
  "moldings",
];

/** Pièce plate (filler, panneau, moulure, fausse porte…) — pas un caisson. */
export function isFlatPart(p: Product): boolean {
  return FLAT_PART_PREFIXES.some((prefix) => p.category.startsWith(prefix));
}

/** Porte de remplacement vendue seule (codes « …-Door »). */
export function isDoorPanel(p: Product): boolean {
  return p.code.includes("-Door");
}

/** SKU jumeau dans l'autre finition (F9-B12 ↔ F9-B12-muf), s'il existe. */
export function finishSibling(p: Product): Product | undefined {
  const other = p.code.endsWith("-muf")
    ? p.code.slice(0, -"-muf".length)
    : `${p.code}-muf`;
  return productsByCode.get(other);
}

/**
 * Largeurs sœurs : même module (nom + catégorie) dans la même finition,
 * triées par largeur croissante. Inclut le produit lui-même.
 */
export function widthSiblings(p: Product): Product[] {
  const isMuf = p.code.endsWith("-muf");
  const siblings = products.filter(
    (q) =>
      q.name === p.name &&
      q.category === p.category &&
      q.code.endsWith("-muf") === isMuf,
  );
  return siblings.sort((a, b) => (a.w || 0) - (b.w || 0));
}

export function productsInCategory(
  slug: string,
  opts: { deep?: boolean } = {},
): Product[] {
  if (!opts.deep) {
    return products.filter((p) => p.category === slug);
  }
  const slugs = new Set(getDescendantSlugs(slug));
  return products.filter((p) => slugs.has(p.category));
}

const hasVisibleCache = new Map<string, boolean>();
const visibleCategorySlugs = new Set(products.map((p) => p.category));

/** Vrai si la catégorie ou un de ses descendants contient au moins un produit visible. */
export function hasVisibleProducts(slug: string): boolean {
  const cached = hasVisibleCache.get(slug);
  if (cached !== undefined) return cached;
  const result = getDescendantSlugs(slug).some((s) =>
    visibleCategorySlugs.has(s),
  );
  hasVisibleCache.set(slug, result);
  return result;
}

export function swatchSlug(c: string): "blanc" | "chene" | "bleu" {
  if (c === "Blanc Pur") return "blanc";
  if (c === "Chêne blanc") return "chene";
  return "bleu";
}
