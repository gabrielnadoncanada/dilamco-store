"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";
import { ModuleRender } from "./module-render";
import { Swatch } from "./legacy/swatch";
import { photoForProduct } from "@/lib/photos";
import type { Product } from "@/lib/types";

export function PCard({ product }: { product: Product }) {
  const defaultColor = product.colors[0] || "Blanc Pur";
  const defaultMolding = product.moldings[0] || "1 po";
  const cart = useCart();
  const photo = photoForProduct(product, defaultColor);

  return (
    <Link
      className="group flex flex-col border border-border bg-card text-card-foreground no-underline transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground"
      href={`/produit/${product.id}`}
    >
      <div className="relative aspect-square overflow-hidden border-b border-border bg-secondary">
        <span className="absolute left-3 top-3 z-[2] border border-border bg-card px-2 py-1 font-mono text-[10px] tracking-[0.06em] text-soft-foreground">
          {product.id}
        </span>
        {photo && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.04]"
            style={{ backgroundImage: `url(${photo})` }}
          />
        )}
        <div className="absolute inset-0 z-[1] flex items-center justify-center bg-gradient-to-b from-background/0 to-background/95 p-[18%] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [&>*]:max-h-full [&>*]:max-w-full">
          <ModuleRender product={product} color={defaultColor} molding={defaultMolding} />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-[2] flex justify-center bg-gradient-to-t from-foreground/90 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            className="cursor-pointer rounded-[1px] bg-background px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.08em] text-primary hover:bg-highlight hover:text-foreground"
            onClick={(e) => {
              e.preventDefault();
              cart.addItem(product, {
                color: defaultColor,
                molding: defaultMolding,
                qty: 1,
              });
            }}
          >
            Ajouter au projet
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-[18px] pb-5 pt-[18px] max-[700px]:text-[11px]">
        <span className="font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
          {product.family.toUpperCase()} · {product.ceiling || ""}
        </span>
        <span className="font-serif text-lg leading-[1.2] tracking-[-0.01em] text-foreground max-[700px]:!text-[13px]">
          {product.name}
        </span>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="font-mono text-[13px] text-foreground group-data-[show-prices=false]/body:hidden">
            ${product.price.toLocaleString("fr-CA")}
          </span>
          <div className="flex gap-1 [&_span]:size-[11px]">
            {product.colors.map((c) => (
              <Swatch key={c} color={c} title={c} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
