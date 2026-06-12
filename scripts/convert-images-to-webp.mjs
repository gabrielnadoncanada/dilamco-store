// Convertit tous les PNG/JPG de public/assets en WebP (et supprime les
// originaux), puis réécrit les chemins dans lib/render-manifest.json.
// Idempotent : à relancer après chaque batch de renders Blender (PNG) —
// `npm run images:webp`.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS_DIR = path.join(root, "public", "assets");
const MANIFEST = path.join(root, "lib", "render-manifest.json");
const QUALITY = 82;

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let converted = 0;
let savedBytes = 0;

for await (const file of walk(ASSETS_DIR)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const { size: before } = await fs.stat(file);
  await sharp(file).webp({ quality: QUALITY, effort: 6 }).toFile(out);
  const { size: after } = await fs.stat(out);
  await fs.unlink(file);
  converted++;
  savedBytes += before - after;
  console.log(
    `${path.relative(root, file)} -> .webp (${(before / 1024).toFixed(0)} Ko -> ${(after / 1024).toFixed(0)} Ko)`,
  );
}

// Réaligne le manifest des renders sur les nouveaux fichiers.
const manifest = await fs.readFile(MANIFEST, "utf8");
const updated = manifest.replaceAll(/\.(png|jpe?g)(")/gi, ".webp$2");
if (updated !== manifest) {
  await fs.writeFile(MANIFEST, updated);
  console.log("lib/render-manifest.json mis à jour (.png -> .webp)");
}

console.log(
  `\n${converted} image(s) converties, ${(savedBytes / 1024 / 1024).toFixed(1)} Mo économisés.`,
);
