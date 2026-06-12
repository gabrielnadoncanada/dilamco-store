"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Headline } from "@/components/ds";
import { findProduct, products as ALL_PRODUCTS } from "@/lib/products";
import { productGalleryViews } from "@/lib/photos";
import { routes } from "@/lib/routes";
import type { ColorName, Molding } from "@/lib/types";
import { ProductBreadcrumb } from "./_components/product-breadcrumb";
import {
  ProductGallery,
  type GalleryView,
} from "./_components/product-gallery";
import { ProductDetails, ProductInfo } from "./_components/product-info";
import { ProductRelated } from "./_components/product-related";
import { ShowroomCta } from "@/components/showroom-cta";

const QUALITY_POINTS = [
  {
    src: "/assets/cabinet.webp",
    title: "Structure intérieure durable",
    body: "Caisson stable et rigide, intérieur propre, tablettes ajustables, assemblages précis.",
  },
  {
    src: "/assets/drawer.webp",
    title: "Tiroirs en bouleau massif",
    body: "Côtés, façade et arrière en bois massif de bouleau — robuste, grain fin, finition haut de gamme.",
  },
  {
    src: "/assets/dovetail.webp",
    title: "Assemblage en queue d'aronde",
    body: "Jonctions renforcées sans fixations visibles : des modules stables et mieux alignés.",
  },
  {
    src: "/assets/warehouse.webp",
    title: "Entrepôt local à Montréal",
    body: "Inventaire contrôlé sur place : disponibilité réelle et délais prévisibles.",
  },
] as const;

/**
 * Bande « construction et qualité » : l'information des anciens blocs
 * éditoriaux pleine largeur, à l'échelle utilitaire de la fiche.
 */
function QualityHighlights() {
  return (
    <section className="mt-20 border-t border-border pt-10 max-[700px]:mt-12 max-[700px]:pt-7">
      <h2 className="font-serif text-[22px] tracking-[-0.01em] text-foreground">
        Construction et qualité
      </h2>
      <div className="mt-6 grid grid-cols-4 gap-6 max-[1000px]:grid-cols-2 max-[520px]:grid-cols-1">
        {QUALITY_POINTS.map((point) => (
          <div key={point.title} className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-secondary">
              <Image
                src={point.src}
                alt={point.title}
                fill
                sizes="(max-width: 520px) 100vw, (max-width: 1000px) 50vw, 25vw"
                className="object-cover [filter:saturate(0.78)_sepia(0.06)]"
              />
            </div>
            <h3 className="text-[14px] font-medium leading-[1.3] text-foreground">
              {point.title}
            </h3>
            <p className="m-0 text-[12px] leading-[1.55] text-soft-foreground">
              {point.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ProduitClient({ id }: { id: string }) {
  const product = findProduct(id);
  const cart = useCart();
  const [color] = useState<ColorName>(
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
        <Headline level="title" as="h2">
          Module introuvable.
        </Headline>
        <Button asChild variant="ghost" className="mt-6">
          <Link href={routes.collections}>Retour aux collections</Link>
        </Button>
      </Container>
    );
  }

  const related = ALL_PRODUCTS.filter(
    (p) => p.family === product.family && p.id !== product.id,
  );

  const views: GalleryView[] = productGalleryViews(product);

  return (
    <Container
      padded
      className="pb-[100px] pt-8 max-[700px]:pb-14 max-[700px]:pt-4"
    >
      <ProductBreadcrumb product={product} />
      <div className="grid grid-cols-[1.15fr_1fr] items-start gap-16 max-[1000px]:grid-cols-1 max-[1000px]:gap-10 max-[700px]:gap-7">
        <div className="flex min-w-0 flex-col gap-8 max-[700px]:gap-6">
          <ProductGallery
            product={product}
            color={color}
            molding={molding}
            views={views}
            view={view}
            onSelectView={setView}
          />
          <div className="max-[1000px]:hidden">
            <ProductDetails product={product} />
          </div>
        </div>
        {/* Colonne d'achat collante (pattern IKEA) ; la galerie défile librement. */}
        <div className="sticky top-[110px] max-[1000px]:static">
          <ProductInfo
            product={product}
            molding={molding}
            setMolding={setMolding}
            qty={qty}
            setQty={setQty}
            onAdd={() => cart.addItem(product, { color, molding, qty })}
          />
        </div>
      </div>
      <div className="mt-8 hidden max-[1000px]:block">
        <ProductDetails product={product} />
      </div>
      <QualityHighlights />
      <ProductRelated products={related} />
      <div className="mt-[100px] max-[700px]:mt-14">
        <ShowroomCta />
      </div>
    </Container>
  );
}
