"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/legacy/container";
import { Heading } from "@/components/legacy/heading";
import { findProduct, products as ALL_PRODUCTS } from "@/lib/products";
import { inSituFor, photoForProduct } from "@/lib/photos";
import type { ColorName, Molding } from "@/lib/types";
import { ProductBreadcrumb } from "./_components/product-breadcrumb";
import {
  ProductGallery,
  type GalleryView,
} from "./_components/product-gallery";
import { ProductInfo } from "./_components/product-info";
import { ProductInSitu } from "./_components/product-insitu";
import { ProductRelated } from "./_components/product-related";

export default function ProduitClient({ id }: { id: string }) {
  const product = findProduct(id);
  const cart = useCart();
  const [color, setColor] = useState<ColorName>(
    (product?.colors[0] as ColorName) || "Blanc Pur",
  );
  const [molding, setMolding] = useState<Molding>(
    (product?.moldings[0] as Molding) || "1 po",
  );
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);

  if (!product) {
    return (
      <Container className="py-20 text-center">
        <Heading as="h2" variant="serif" className="text-[32px]">
          Module introuvable.
        </Heading>
        <Button asChild variant="ghost" className="mt-6">
          <Link href="/catalogue">Retour au catalogue</Link>
        </Button>
      </Container>
    );
  }

  const related = ALL_PRODUCTS.filter(
    (p) => p.family === product.family && p.id !== product.id,
  ).slice(0, 4);

  const ambiancePhoto = photoForProduct(product, color);
  const inSitu = inSituFor(product);
  const views: GalleryView[] = [
    { type: "photo", src: ambiancePhoto, label: "Ambiance" },
    { type: "svg", src: undefined, label: "Vue technique" },
    { type: "photo", src: inSitu[1], label: "Détail · Moulure" },
    { type: "photo", src: inSitu[2], label: "Atelier" },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pb-[100px] pt-8 max-[700px]:px-[18px] max-[700px]:pb-14 max-[700px]:pt-4">
      <ProductBreadcrumb product={product} />
      <div className="grid grid-cols-[1.15fr_1fr] items-start gap-16 max-[1000px]:grid-cols-1 max-[1000px]:gap-10 max-[700px]:gap-7">
        <ProductGallery
          product={product}
          color={color}
          molding={molding}
          views={views}
          view={view}
          onSelectView={setView}
        />
        <ProductInfo
          product={product}
          color={color}
          setColor={setColor}
          molding={molding}
          setMolding={setMolding}
          qty={qty}
          setQty={setQty}
          onAdd={() => cart.addItem(product, { color, molding, qty })}
        />
      </div>
      <ProductRelated products={related} />
    </div>
  );
}
