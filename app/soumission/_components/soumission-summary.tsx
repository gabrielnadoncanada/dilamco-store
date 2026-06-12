"use client";

import { useCart } from "@/components/cart-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow, Headline } from "@/components/ds";
import { routes } from "@/lib/routes";
import { findProduct } from "@/lib/products";
import { photoForProduct } from "@/lib/photos";
import { Price } from "@/components/price";

export function SoumissionSummary() {
  const cart = useCart();

  return (
    <aside className="sticky top-[120px] self-start border border-border bg-secondary p-8 max-[1000px]:static">
      <Eyebrow>Votre projet</Eyebrow>
      <Headline level="title" as="h3" className="mt-2">
        {cart.totalQty} module{cart.totalQty !== 1 ? "s" : ""} sélectionné
        {cart.totalQty !== 1 ? "s" : ""}
      </Headline>
      {cart.items.length === 0 ? (
        <div className="py-6 text-[13px] leading-[1.6] text-muted-foreground">
          Vous pouvez soumettre la demande sans avoir encore choisi de modules : un chef
          de projet vous accompagnera dans la sélection.
          <div className="mt-4">
            <Button asChild variant="ghost" size="small">
              <Link href={routes.collections}>Parcourir les collections</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 flex flex-col gap-3.5 border-b border-border pb-5 group-data-[show-prices=false]/body:hidden">
            {cart.items.map((it) => (
              <div
                key={it.key}
                className="grid grid-cols-[40px_1fr_auto] items-start gap-3 text-xs"
              >
                <span
                  className="relative block aspect-square border border-border bg-card bg-cover bg-center"
                  style={(() => {
                    const product = findProduct(it.productId);
                    return product
                      ? { backgroundImage: `url(${photoForProduct(product, it.color)})` }
                      : undefined;
                  })()}
                >
                  <span className="absolute -right-1.5 -top-1.5 flex min-w-[18px] items-center justify-center rounded-full bg-foreground px-1 font-mono text-[10px] leading-[18px] text-background">
                    {it.qty}
                  </span>
                </span>
                <span>
                  <span className="font-serif text-sm leading-[1.2] text-foreground">
                    {it.name}
                  </span>
                  <br />
                  <span className="text-[11px] text-muted-foreground">
                    {it.color} · Shaker {it.molding}
                  </span>
                </span>
                <Price amount={it.price * it.qty} size="sm" />
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2.5 group-data-[show-prices=false]/body:hidden">
            <div className="flex justify-between text-[13px] text-soft-foreground">
              <span>Sous-total catalogue</span>
              <Price amount={cart.subtotal} size="sm" />
            </div>
            <div className="flex justify-between text-[13px] text-soft-foreground">
              <span>Panneaux + fillers (est.)</span>
              <span className="text-muted-foreground">chiffrés</span>
            </div>
            <div className="flex justify-between text-[13px] text-soft-foreground">
              <span>Livraison + installation</span>
              <span className="text-muted-foreground">chiffrés</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-3.5 font-serif text-lg tracking-[-0.01em] text-foreground">
              <span>Estimation modules</span>
              <Price amount={cart.subtotal} size="md" />
            </div>
          </div>
          <p className="mt-4 text-[11px] leading-[1.5] text-muted-foreground">
            Estimation indicative basée sur le catalogue technique. La soumission ferme
            inclut tous les éléments de finition, livraison et pose.
          </p>
        </>
      )}
    </aside>
  );
}
