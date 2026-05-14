"use client";

import { useCart } from "@/components/cart-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow, Headline } from "@/components/ds";

export function SoumissionSummary() {
  const cart = useCart();

  return (
    <aside className="sticky top-[120px] self-start border border-border bg-secondary p-8 max-[1000px]:static">
      <Eyebrow>Votre projet</Eyebrow>
      <Headline level="title" as="h3" className="mt-2 text-2xl tracking-[-0.01em]">
        {cart.totalQty} module{cart.totalQty !== 1 ? "s" : ""} sélectionné
        {cart.totalQty !== 1 ? "s" : ""}
      </Headline>
      {cart.items.length === 0 ? (
        <div className="py-6 text-[13px] leading-[1.6] text-muted-foreground">
          Vous pouvez soumettre la demande sans avoir encore choisi de modules : un chef
          de projet vous accompagnera dans la sélection.
          <div className="mt-4">
            <Button asChild variant="ghost" size="small">
              <Link href="/catalogue">Parcourir le catalogue</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 flex flex-col gap-3.5 border-b border-border pb-5 group-data-[show-prices=false]/body:hidden">
            {cart.items.map((it) => (
              <div
                key={it.key}
                className="grid grid-cols-[auto_1fr_auto] items-start gap-3 text-xs"
              >
                <span className="pt-0.5 font-mono text-[11px] text-muted-foreground">
                  {String(it.qty).padStart(2, "0")}×
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
                <span className="font-mono text-xs text-foreground">
                  ${(it.price * it.qty).toLocaleString("fr-CA")}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2.5 group-data-[show-prices=false]/body:hidden">
            <div className="flex justify-between text-[13px] text-soft-foreground">
              <span>Sous-total catalogue</span>
              <span className="font-mono text-xs">${cart.subtotal.toLocaleString("fr-CA")}</span>
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
              <span>${cart.subtotal.toLocaleString("fr-CA")}</span>
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
