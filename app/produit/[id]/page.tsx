import { findProduct } from "@/lib/products";
import ProduitClient from "./produit-client";

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
