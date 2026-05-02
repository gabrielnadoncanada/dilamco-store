/* ============================================================
   Dilamco — Photo manifest
   ============================================================
   Centralized atmospheric photography. Assigned by family + color.
   Photos: curated kitchen ambient shots (Unsplash editorial license).
   ============================================================ */

const PH = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Verified working IDs — kitchen / cabinetry / interiors
const PHOTOS = {
  // Hero / lifestyle
  hero: PH('1556909114-f6e7ad7d3136', 1800),
  hero_dark: PH('1583847268964-b28dc8f51f92', 1800),
  hero_warm: PH('1600585154340-be6161a56a0c', 1800),

  // Family ambient — wall cabinets
  wall_blanc: PH('1600210492486-724fe5c67fb0'),
  wall_chene: PH('1565538810643-b5bdb714032a'),
  wall_bleu: PH('1583847268964-b28dc8f51f92'),

  // Family — base cabinets
  base_blanc: PH('1556909114-f6e7ad7d3136'),
  base_chene: PH('1556912167-f556f1f39fdf'),
  base_bleu: PH('1600585154340-be6161a56a0c'),

  // Pantry / tall storage
  pantry_blanc: PH('1600585154340-be6161a56a0c'),
  pantry_chene: PH('1556912167-f556f1f39fdf'),
  pantry_bleu: PH('1556912173-46c336c7fd55'),

  // Above fridge — cleaner shots
  fridge_blanc: PH('1574180566232-aaad1b5b8450'),
  fridge_chene: PH('1556910103-1c02745aae4d'),
  fridge_bleu: PH('1556912173-46c336c7fd55'),

  // Corner / coin
  corner_blanc: PH('1565538810643-b5bdb714032a'),
  corner_chene: PH('1556912167-f556f1f39fdf'),
  corner_bleu: PH('1556912173-46c336c7fd55'),

  // Detail / texture
  detail_handle: PH('1600121848594-d8644e57abab'),
  detail_grain: PH('1600573472556-e636c2acda88'),
  detail_joint: PH('1600585154526-990dced4db0d'),
  detail_shaker: PH('1565183997392-2f6f122e5912'),

  // Atelier / craft
  atelier_1: PH('1581094288338-2314dddb7ece'),
  atelier_2: PH('1504148455328-c376907d081c'),
  atelier_3: PH('1530124566582-a618bc2615dc'),
  atelier_4: PH('1568495248636-6432b97bd949'),

  // Project / lifestyle Montreal
  project_1: PH('1600210492486-724fe5c67fb0'),
  project_2: PH('1600585154340-be6161a56a0c'),
  project_3: PH('1556912167-f556f1f39fdf'),
  project_4: PH('1556912173-46c336c7fd55'),
  project_5: PH('1565538810643-b5bdb714032a'),
  project_6: PH('1574180566232-aaad1b5b8450'),
};

// Map family + color → photo
function photoForProduct(product, color) {
  const c = (color || product.colors[0]) === 'Blanc Pur' ? 'blanc'
    : (color || product.colors[0]) === 'Chêne blanc' ? 'chene'
    : 'bleu';
  const fam = product.family;
  if (fam === 'Armoire murale' || fam === 'Armoire murale de coin') return PHOTOS[`wall_${c}`];
  if (fam === 'Armoire de bas' || fam === 'Armoire de bas de coin') return PHOTOS[`base_${c}`];
  if (fam === 'Garde-manger') return PHOTOS[`pantry_${c}`];
  if (fam === 'Armoire au-dessus du réfrigérateur') return PHOTOS[`fridge_${c}`];
  return PHOTOS[`wall_${c}`];
}

// In-situ strip (3 photos) for PDP — varies by family
function inSituFor(product) {
  const fam = product.family;
  if (fam.includes('Garde-manger')) return [PHOTOS.pantry_chene, PHOTOS.detail_grain, PHOTOS.atelier_2];
  if (fam.includes('coin')) return [PHOTOS.corner_blanc, PHOTOS.detail_joint, PHOTOS.atelier_3];
  if (fam.includes('bas')) return [PHOTOS.base_blanc, PHOTOS.detail_handle, PHOTOS.atelier_1];
  return [PHOTOS.wall_blanc, PHOTOS.detail_shaker, PHOTOS.atelier_4];
}

window.PHOTOS = PHOTOS;
window.photoForProduct = photoForProduct;
window.inSituFor = inSituFor;
