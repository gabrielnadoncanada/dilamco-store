"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { Button, ButtonArrow } from "@/components/ui/button";
import {
  Section,
  Container,
  SectionHeading,
  Body,
  Eyebrow,
} from "@/components/ds";
import { findProduct } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { Price } from "@/components/price";
import { routes } from "@/lib/routes";
import type { Product } from "@/lib/types";

interface StarterLine {
  code: string;
  qty: number;
}

interface StarterKitchen {
  id: string;
  name: string;
  blurb: string;
  lines: StarterLine[];
}

/**
 * Compositions de départ à partir de SKU réels du catalogue. Le prix est
 * calculé en direct — si un code disparaît du catalogue, la ligne est ignorée
 * et le total reste juste.
 */
const KITCHENS: StarterKitchen[] = [
  {
    id: "l-10x10",
    name: "Cuisine en L · 10 × 10 pi",
    blurb:
      "La configuration la plus demandée : coin dînette, évier farmhouse, rangée de tiroirs et garde-manger.",
    lines: [
      { code: "F9-BBC42", qty: 1 },
      { code: "F9-FSB33*19.75(10-1/8)", qty: 1 },
      { code: "F9-DB18", qty: 1 },
      { code: "F9-B18", qty: 2 },
      { code: "F9-B15", qty: 1 },
      { code: "F9-B18-PO", qty: 1 },
      { code: "F9-W3030", qty: 2 },
      { code: "F9-W1830", qty: 2 },
      { code: "F9-W2430", qty: 1 },
      { code: "F9-WBL2430", qty: 1 },
      { code: "F9-WP188427", qty: 1 },
    ],
  },
  {
    id: "condo-8pi",
    name: "Cuisine condo · 8 pi",
    blurb:
      "Un seul mur, zéro espace perdu : évier, tiroirs, micro-ondes intégré et rangement en hauteur.",
    lines: [
      { code: "F9-FSB33*19.75(10-1/8)", qty: 1 },
      { code: "F9-B15", qty: 1 },
      { code: "F9-DB15", qty: 1 },
      { code: "F9-W3030", qty: 1 },
      { code: "F9-W1530", qty: 2 },
      { code: "F9-WBL2430", qty: 1 },
    ],
  },
];

function resolve(k: StarterKitchen): Array<{ product: Product; qty: number }> {
  return k.lines
    .map(({ code, qty }) => {
      const product = findProduct(code);
      return product ? { product, qty } : null;
    })
    .filter((x): x is { product: Product; qty: number } => x !== null);
}

export function StarterKitchens() {
  const cart = useCart();

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Par où commencer"
          title="Deux cuisines types, chiffrées au module près."
        />
        <Body size="default" tone="soft" className="mt-4 max-w-[560px]">
          Préchargez une composition dans votre projet, puis ajustez chaque
          module à vos mesures. Les prix affichés couvrent les modules —
          panneaux, fillers et installation sont chiffrés à la soumission.
        </Body>
        <div className="mt-10 grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
          {KITCHENS.map((kitchen) => {
            const items = resolve(kitchen);
            const total = items.reduce(
              (s, { product, qty }) => s + product.price * qty,
              0,
            );
            const moduleCount = items.reduce((s, { qty }) => s + qty, 0);
            return (
              <article
                key={kitchen.id}
                className="flex flex-col gap-4 border border-border bg-card p-8 max-[700px]:p-5"
              >
                <Eyebrow tone="muted">{moduleCount} modules</Eyebrow>
                <h3 className="font-serif text-[26px] leading-[1.15] tracking-[-0.01em] text-foreground">
                  {kitchen.name}
                </h3>
                <Body size="sm" tone="soft" className="leading-[1.6]">
                  {kitchen.blurb}
                </Body>
                <ul className="flex flex-col gap-1.5 border-y border-border py-4 text-xs text-soft-foreground">
                  {items.map(({ product, qty }) => (
                    <li key={product.code} className="flex justify-between gap-4">
                      <span className="truncate">
                        {qty} × {product.shortName || product.name}
                      </span>
                      <span className="shrink-0 font-mono text-muted-foreground group-data-[show-prices=false]/body:hidden">
                        {formatPrice(product.price * qty)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline justify-between group-data-[show-prices=false]/body:hidden">
                  <span className="text-xs text-muted-foreground">
                    Modules seulement
                  </span>
                  <Price amount={total} size="lg" />
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <Button
                    onClick={() => {
                      for (const { product, qty } of items) {
                        cart.addItem(product, {
                          color: product.colors[0] || "Blanc Pur",
                          molding: product.moldings[0] || "1 po",
                          qty,
                        });
                      }
                    }}
                  >
                    Précharger ce projet <ButtonArrow />
                  </Button>
                  <Link
                    href={routes.quote}
                    className="text-xs tracking-[0.04em] text-soft-foreground underline underline-offset-4 hover:text-primary"
                  >
                    Demander une soumission
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
