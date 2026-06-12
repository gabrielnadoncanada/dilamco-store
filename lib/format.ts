const priceFormatter = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Prix au format québécois : `1 234,56 $` (jamais `$1,234.56`). */
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

/** Dimension en pouces, virgule décimale française : 34.5 → `34,5`. */
export function formatDim(value: number): string {
  return String(value).replace(".", ",");
}
