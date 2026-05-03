"use client";

import { Eyebrow } from "@/components/legacy/eyebrow";
import { Heading } from "@/components/legacy/heading";
import type { SortKey } from "./types";

interface Props {
  total: number;
  filteredCount: number;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  activeFilterCount: number;
  onOpenFilters: () => void;
}

export function CatalogueHead({
  total,
  filteredCount,
  sort,
  onSortChange,
  activeFilterCount,
  onOpenFilters,
}: Props) {
  return (
    <div className="col-span-full flex flex-wrap items-end justify-between gap-8 border-b border-border pb-7 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-3">
      <div className="max-[700px]:w-full">
        <Eyebrow accent>Catalogue technique</Eyebrow>
        <Heading
          as="h1"
          className="mt-2 font-serif text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-foreground max-[700px]:!text-[28px]"
        >
          Armoires de cuisine
        </Heading>
      </div>
      <div className="flex flex-wrap items-center gap-3 max-[700px]:w-full max-[700px]:gap-2">
        <span className="font-mono text-xs tracking-[0.04em] text-muted-foreground max-[700px]:text-[11px]">
          {filteredCount} module{filteredCount !== 1 ? "s" : ""} sur {total}
        </span>
        <select
          className="cursor-pointer border border-border-strong bg-transparent px-3.5 py-2.5 pr-8 text-xs tracking-[0.06em] text-foreground max-[700px]:min-w-0 max-[700px]:flex-1"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
        >
          <option value="family">Trier · Famille</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="width">Largeur</option>
        </select>
        <button
          className="hidden cursor-pointer border-0 bg-foreground px-[18px] py-[11px] text-xs font-medium uppercase tracking-[0.06em] text-background max-[1100px]:inline-flex"
          onClick={onOpenFilters}
        >
          Filtres{activeFilterCount > 0 ? ` · ${activeFilterCount}` : ""}
        </button>
      </div>
    </div>
  );
}
