/**
 * Synchronise le catalogue depuis catalog.xlsx (source de vérité, racine du repo)
 * vers lib/catalog-products.json et lib/catalog-categories.json.
 *
 * Usage : npm run sync:catalog
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as XLSX from "xlsx";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const XLSX_PATH = path.join(root, "catalog.xlsx");
const PRODUCTS_OUT = path.join(root, "lib", "catalog-products.json");
const CATEGORIES_OUT = path.join(root, "lib", "catalog-categories.json");

const warnings = [];
const warn = (msg) => warnings.push(msg);

const slugify = (s) =>
  String(s)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const clean = (v) => {
  if (v === null || v === undefined) return undefined;
  const s = String(v).trim();
  return s === "" ? undefined : s;
};
const num = (v) => (typeof v === "number" ? v : undefined);

const wb = XLSX.read(readFileSync(XLSX_PATH));

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
const catRows = XLSX.utils
  .sheet_to_json(wb.Sheets["Categories"], { defval: null })
  .filter((r) => clean(r.slug));

const catBySlug = new Map();
for (const r of catRows) {
  const slug = clean(r.slug);
  if (catBySlug.has(slug)) warn(`Categories: slug en double "${slug}" (dernière ligne gagnante)`);
  catBySlug.set(slug, {
    slug,
    parent: clean(r.parent) ?? null,
    nameFr: clean(r.name_fr) ?? slug,
  });
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
const prodRows = XLSX.utils
  .sheet_to_json(wb.Sheets["Products"], { defval: null })
  .filter((r) => clean(r.internal_code));

const seen = new Set();
const products = [];
let brokenSkus = 0;
for (const r of prodRows) {
  const code = clean(r.internal_code);
  if (seen.has(code)) {
    warn(`Products: internal_code en double "${code}" — ligne ignorée`);
    continue;
  }
  seen.add(code);

  const category = clean(r.sub_category);
  if (!category) warn(`Products: ${code} sans sub_category`);
  const fullName = clean(r.full_name);
  const subCatFr = clean(r.sub_category_fr);
  if (subCatFr?.startsWith("⚠")) warn(`Products: ${code} — sub_category_fr en erreur dans Excel ("${subCatFr}")`);

  const p = {
    code,
    name: fullName ?? clean(r.name) ?? code,
    shortName: clean(r.short_name),
    externalCode: clean(r.external_code),
    sku: clean(r.SKU),
    finish: clean(r.finish),
    price: num(r.price) ?? 0,
    category: category ?? "uncategorized",
    partType: clean(r.partType),
    w: num(r.w),
    h: num(r.h),
    d: num(r.d),
    doors: num(r.doors),
    drawers: num(r.drawers),
    visible: r.visible === true,
  };
  if (p.price <= 0 && p.visible) warn(`Products: ${code} visible sans prix valide (${r.price})`);
  if (p.sku?.startsWith("-")) {
    // SKU Excel = external_code + suffixe finition ; sans external_code il est inutilisable
    brokenSkus++;
    delete p.sku;
  }
  // Retire les clés undefined pour un JSON propre
  for (const k of Object.keys(p)) if (p[k] === undefined) delete p[k];
  products.push(p);
}

if (brokenSkus) {
  warn(
    `Products: ${brokenSkus} SKU incomplets (external_code manquant dans catalog.xlsx) — omis du JSON`,
  );
}

// Catégories référencées par des produits mais absentes de la feuille Categories :
// on les crée (parent = plus long préfixe existant) pour ne pas orpheliner les produits.
const referenced = new Set(products.map((p) => p.category));
for (const slug of referenced) {
  if (catBySlug.has(slug)) continue;
  let parent = null;
  for (const existing of catBySlug.keys()) {
    if (slug.startsWith(existing + "-") && (!parent || existing.length > parent.length)) {
      parent = existing;
    }
  }
  catBySlug.set(slug, { slug, parent, nameFr: slug, autoAdded: true });
  warn(
    `Categories: "${slug}" référencée par des produits mais absente de la feuille Categories — ` +
      `ajoutée automatiquement (parent: ${parent ?? "aucun"}). À corriger dans catalog.xlsx.`,
  );
}

// Parents inconnus → la catégorie devient inatteignable depuis la racine
for (const c of catBySlug.values()) {
  if (c.parent && !catBySlug.has(c.parent)) {
    warn(`Categories: "${c.slug}" a un parent inconnu "${c.parent}" — gardée telle quelle (invisible en nav)`);
  }
}

// path (chaîne d'ancêtres) + slugFr, avec garde anti-cycle
function pathOf(slug) {
  const out = [];
  let cur = slug;
  const visited = new Set();
  while (cur && catBySlug.has(cur) && !visited.has(cur)) {
    visited.add(cur);
    out.unshift(cur);
    cur = catBySlug.get(cur).parent;
  }
  return out;
}

const categories = [...catBySlug.values()].map((c) => {
  const p = pathOf(c.slug);
  return {
    slug: c.slug,
    parent: c.parent,
    name: { fr: c.nameFr, en: null },
    slugFr: p.map((s) => slugify(catBySlug.get(s).nameFr)).join("-"),
    path: p,
  };
});

// ---------------------------------------------------------------------------
// Écriture
// ---------------------------------------------------------------------------
writeFileSync(
  PRODUCTS_OUT,
  JSON.stringify({ source: "catalog.xlsx (feuille Products)", products }, null, 2) + "\n",
);
writeFileSync(
  CATEGORIES_OUT,
  JSON.stringify({ source: "catalog.xlsx (feuille Categories)", categories }, null, 2) + "\n",
);

const visible = products.filter((p) => p.visible).length;
console.log(`✔ ${products.length} produits (${visible} visibles) → lib/catalog-products.json`);
console.log(`✔ ${categories.length} catégories → lib/catalog-categories.json`);
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} avertissement(s) :`);
  for (const w of warnings) console.log(`  - ${w}`);
}
