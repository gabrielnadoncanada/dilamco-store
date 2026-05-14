"use client";

import { Button, ButtonArrow } from "@/components/ui/button";
import { Headline, Body, Eyebrow } from "@/components/ds";
import { Swatch } from "@/components/swatch";
import { ProductSpecs } from "./product-specs";
import type { ColorName, Molding, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const COLOR_DESC: Record<ColorName, string> = {
  "Blanc Pur": "Blanc opaque, finition mate. La référence neutre du catalogue.",
  "Chêne blanc": "Placage bouleau teinté chêne, veinage horizontal apparent.",
  "Bleu marin": "Bleu profond mat, finition catalysée. Pour les îlots et coins repas.",
};

interface Props {
  product: Product;
  color: ColorName;
  setColor: (c: ColorName) => void;
  molding: Molding;
  setMolding: (m: Molding) => void;
  qty: number;
  setQty: (fn: (q: number) => number) => void;
  onAdd: () => void;
}

export function ProductInfo({
  product,
  color,
  setColor,
  molding,
  setMolding,
  qty,
  setQty,
  onAdd,
}: Props) {
  return (
    <div className="flex flex-col gap-6 pt-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-primary">
        {product.family} · {product.ceiling || "Plafond standard"}
      </span>
      <Headline level="headline" as="h1">
        {product.name}
      </Headline>
      <div className="font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
        SKU · {product.id}
        {product.corner && product.corner !== "Non"
          ? " · Configuration " + product.corner.toLowerCase()
          : ""}
      </div>

      <div className="flex flex-col gap-1.5 border-y border-border py-5 group-data-[show-prices=false]/body:hidden">
        <span className="font-serif text-[32px] tracking-[-0.02em] text-foreground max-[700px]:!text-[22px]">
          ${product.price.toLocaleString("fr-CA")}{" "}
          <span className="font-sans text-sm text-muted-foreground">
            CAD
          </span>
        </span>
        <span className="text-xs leading-[1.5] text-muted-foreground">
          Prix module nu. Panneaux de finition, fillers et installation chiffrés à la
          soumission.
        </span>
      </div>

      <Body size="default" tone="soft" className="leading-[1.65] max-[700px]:text-sm">
        Caisson en contreplaqué, finition intérieure en placage de bouleau. Porte HDF avec
        moulure massive en bouleau. Quincaillerie Blum à fermeture amortie. Fini extérieur
        catalysé, assorti à la couleur sélectionnée.
      </Body>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <Eyebrow tone="muted">Couleur</Eyebrow>
          <span className="font-serif text-[13px] italic text-foreground">{color}</span>
        </div>
        <div className={cn("grid gap-2", product.colors.length === 1 ? "grid-cols-1" : product.colors.length === 2 ? "grid-cols-2" : "grid-cols-3")}>
          {product.colors.map((c) => (
            <div
              key={c}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 border border-border-strong bg-card px-3.5 py-3 text-xs tracking-[0.02em] text-soft-foreground transition-colors hover:border-foreground",
                color === c && "border-primary bg-secondary text-foreground",
              )}
              onClick={() => setColor(c)}
            >
              <Swatch color={c} size="lg" />
              <span>{c}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-[1.5] text-muted-foreground">
          {COLOR_DESC[color]}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <Eyebrow tone="muted">Moulure de porte</Eyebrow>
          <span className="font-serif text-[13px] italic text-foreground">
            Shaker {molding}
          </span>
        </div>
        <div className={cn("grid gap-2", product.moldings.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
          {product.moldings.map((m) => (
            <button
              key={m}
              className={cn(
                "flex cursor-pointer flex-col items-start gap-1 border border-border-strong bg-card px-4 py-3.5 text-left transition-colors hover:border-foreground",
                molding === m && "border-primary bg-secondary",
              )}
              onClick={() => setMolding(m)}
            >
              <strong className="font-serif text-base font-normal text-foreground">
                Shaker {m}
              </strong>
              <span className="text-[11px] leading-[1.4] text-muted-foreground">
                {m === "1 po"
                  ? "Profil épuré, contemporain"
                  : "Profil large, classique éditorial"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-stretch gap-3 pt-2 max-[700px]:sticky max-[700px]:bottom-0 max-[700px]:z-10 max-[700px]:-mx-[18px] max-[700px]:border-t max-[700px]:border-border max-[700px]:bg-background max-[700px]:px-[18px] max-[700px]:py-3.5">
        <div className="inline-flex items-center border border-foreground bg-card">
          <button
            className="h-full w-11 cursor-pointer bg-transparent text-lg text-foreground hover:bg-secondary"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <input
            className="h-full w-11 border-x border-border bg-transparent text-center font-mono text-sm text-foreground outline-none"
            value={qty}
            onChange={(e) => {
              const next = Math.max(1, parseInt(e.target.value, 10) || 1);
              setQty(() => next);
            }}
          />
          <button
            className="h-full w-11 cursor-pointer bg-transparent text-lg text-foreground hover:bg-secondary"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>
        <Button className="flex-1" onClick={onAdd}>
          Ajouter au projet — ${(product.price * qty).toLocaleString("fr-CA")} <ButtonArrow />
        </Button>
      </div>

      <ProductSpecs product={product} />
    </div>
  );
}
