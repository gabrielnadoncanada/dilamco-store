import { findProduct, products } from "@/lib/products";
import ProduitClient from "./produit-client";

/**
 * Fiches produit prérendues (SSG) : TTFB instantané au lieu d'un rendu par
 * requête. Les codes contenant des caractères interdits dans un nom de
 * fichier (ex. `F9-BDD21.75*36`) cassent l'export sur Windows : ils restent
 * rendus à la demande.
 */
export function generateStaticParams() {
  return products
    .filter((p) => !/[*?"<>|:\\]/.test(p.id))
    .map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = findProduct(id);
  return {
    title: product
      ? `${product.name} · Dilamco`
      : "Module introuvable · Dilamco",
  };
}

export default async function ProduitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProduitClient id={id} />;
}
