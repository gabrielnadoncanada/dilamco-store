"use client";

import { useMemo } from "react";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { products as ALL_PRODUCTS } from "@/lib/products";
import { Eyebrow, Headline } from "@/components/ds";
import { PCard } from "@/components/pcard";
import { CollectionsShell } from "./_components/collections-shell";
import { FAMILY_ORDER, SORT_VALUES, type SortKey } from "./_components/types";

export default function CollectionsClient() {
  const [sort, setSort] = useQueryState(
    "tri",
    parseAsStringLiteral(SORT_VALUES).withDefault("family"),
  );

  const sorted = useMemo(() => {
    return [...ALL_PRODUCTS].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "width") return (a.w || 0) - (b.w || 0);
      const fa = FAMILY_ORDER.indexOf(a.family);
      const fb = FAMILY_ORDER.indexOf(b.family);
      if (fa !== fb) return fa - fb;
      return (a.w || 0) - (b.w || 0);
    });
  }, [sort]);

  return (
    <CollectionsShell>
      <CollectionsHeader
        total={ALL_PRODUCTS.length}
        shown={sorted.length}
        sort={sort}
        onSortChange={setSort}
      />
      <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 max-[1100px]:grid-cols-2 max-[700px]:!grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-[18px] max-[380px]:!grid-cols-1">
        {sorted.slice(0, 60).map((p) => (
          <PCard key={p.code} product={p} />
        ))}
      </div>
      {sorted.length > 60 && (
        <div className="mt-14 text-center text-[13px] text-muted-foreground">
          Affichage 60 sur {sorted.length}. Naviguez par catégorie pour affiner.
        </div>
      )}
    </CollectionsShell>
  );
}

function CollectionsHeader({
  total,
  shown,
  sort,
  onSortChange,
}: {
  total: number;
  shown: number;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-8 border-b border-border pb-7 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-3">
      <div className="max-[700px]:w-full">
        <Eyebrow>Catalogue technique</Eyebrow>
        <Headline level="headline" as="h1" className="mt-2">
          Armoires de cuisine
        </Headline>
      </div>
      <div className="flex flex-wrap items-center gap-3 max-[700px]:w-full max-[700px]:gap-2">
        <span className="font-mono text-xs tracking-[0.04em] text-muted-foreground max-[700px]:text-[11px]">
          {shown} module{shown !== 1 ? "s" : ""} sur {total}
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
      </div>
    </div>
  );
}
