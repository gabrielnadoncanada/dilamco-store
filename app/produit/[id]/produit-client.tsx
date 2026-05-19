"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Headline, SplitMediaCta } from "@/components/ds";
import { findProduct, products as ALL_PRODUCTS } from "@/lib/products";
import { productGalleryViews } from "@/lib/photos";
import { routes } from "@/lib/routes";
import type { ColorName, Molding } from "@/lib/types";
import { ProductBreadcrumb } from "./_components/product-breadcrumb";
import {
  ProductGallery,
  type GalleryView,
} from "./_components/product-gallery";
import { ProductInfo } from "./_components/product-info";
import { ProductRelated } from "./_components/product-related";
import { ShowroomCta } from "@/components/showroom-cta";

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
      <div className="mt-[100px] flex flex-col gap-10 max-[700px]:mt-14 max-[700px]:gap-7">
        <SplitMediaCta
          imageSrc="/assets/cabinet.png"
          imagePosition="left"
          headline="Structure intérieure durable"
          body="Chaque caisson est conçu pour offrir une base stable, rigide et durable à votre cuisine. L’intérieur propre, les tablettes ajustables et les assemblages précis donnent une impression de solidité dès l’ouverture des portes."
        />
        <SplitMediaCta
          imageSrc="/assets/drawer.jpg"
          imagePosition="right"
          headline="Tiroirs en bouleau massif"
          body="Les côtés, la façade et l’arrière de nos tiroirs sont fabriqués en bois massif de bouleau, un matériau reconnu pour sa robustesse, son grain fin et sa finition haut de gamme. "
        />
        <SplitMediaCta
          imageSrc="/assets/dovetail.jpg"
          imagePosition="left"
          headline="Solidité mécanique et installation maîtrisée"
          body="L’assemblage en queue d’aronde renforce la jonction des tiroirs sans dépendre uniquement de vis ou de fixations visibles. Cette précision d’assemblage aide à conserver des modules plus stables, mieux alignés et plus simples à intégrer."
        />
        <SplitMediaCta
          imageSrc="/assets/warehouse.jpg"
          imagePosition="right"
          headline="Entrepôt local à Montréal"
          body="Notre entrepôt local nous permet de garder un meilleur contrôle sur l’inventaire, la disponibilité des modules et la planification des projets. Cette présence physique réduit les imprévus, facilite la coordination et offre aux clients une expérience plus stable, prévisible et maîtrisée."
        />
      </div>
      <ProductRelated products={related} />
      <div className="mt-[100px] max-[700px]:mt-14">
        <ShowroomCta />
      </div>
    </Container>
  );
}
