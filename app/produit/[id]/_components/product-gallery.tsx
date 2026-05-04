"use client";

import { ModuleRender } from "@/components/module-render";
import type { ColorName, Molding, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface GalleryView {
  type: "photo" | "svg";
  src?: string;
  label: string;
}

interface Props {
  product: Product;
  color: ColorName;
  molding: Molding;
  views: GalleryView[];
  view: number;
  onSelectView: (i: number) => void;
}

export function ProductGallery({
  product,
  color,
  molding,
  views,
  view,
  onSelectView,
}: Props) {
  const current = views[view] || views[0];

  return (
    <div className="sticky top-[120px] flex flex-col gap-4 max-[1000px]:static max-[1000px]:top-auto">
      <div className="relative aspect-square overflow-hidden border border-border bg-secondary max-[700px]:aspect-[4/3]">
        {current.type === "photo" && current.src ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.src})` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-[12%] [&>*]:max-h-full [&>*]:max-w-full">
            <ModuleRender product={product} color={color} molding={molding} />
          </div>
        )}
        <div className="absolute bottom-3.5 left-3.5 bg-foreground/85 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-background">
          FIG.{String(view + 1).padStart(2, "0")} · {current.label}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {views.map((v, i) => (
          <div
            key={i}
            className={cn(
              "relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden border border-border bg-secondary p-[14%] transition-colors hover:border-soft-foreground [&>*]:max-h-full [&>*]:max-w-full",
              view === i && "border-2 border-primary",
            )}
            onClick={() => onSelectView(i)}
          >
            {v.type === "photo" && v.src ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${v.src})` }}
              />
            ) : (
              <ModuleRender product={product} color={color} molding={molding} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
