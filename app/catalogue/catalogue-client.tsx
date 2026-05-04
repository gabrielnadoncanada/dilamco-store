"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products as ALL_PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/types";
import { CatalogueHead } from "./_components/catalogue-head";
import { CatalogueFilters } from "./_components/catalogue-filters";
import { CatalogueGrid } from "./_components/catalogue-grid";
import { FAMILY_ORDER } from "./_components/types";
import type { Filters, ToggleArr } from "./_components/types";

export default function CatalogueClient() {
  const search = useSearchParams();
  const familleParam = search.get("famille") || "";
  const coinParam = search.get("coin") || "";

  const [filters, setFilters] = useState<Filters>(() => ({
    families: familleParam ? [familleParam] : [],
    colors: [],
    moldings: [],
    ceilings: [],
    corner: coinParam === "oui" ? "corner" : "all",
    sort: "family",
  }));
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (familleParam) setFilters((f) => ({ ...f, families: [familleParam] }));
    if (coinParam === "oui") setFilters((f) => ({ ...f, corner: "corner" }));
  }, [familleParam, coinParam]);

  const filtered = useMemo<Product[]>(() => {
    return ALL_PRODUCTS.filter((p) => {
      if (filters.families.length && !filters.families.includes(p.family))
        return false;
      if (
        filters.colors.length &&
        !p.colors.some((c) => filters.colors.includes(c))
      )
        return false;
      if (
        filters.moldings.length &&
        !p.moldings.some((m) => filters.moldings.includes(m))
      )
        return false;
      if (
        filters.ceilings.length &&
        p.ceiling &&
        !filters.ceilings.includes(p.ceiling)
      )
        return false;
      if (filters.corner === "corner" && (p.corner === "Non" || !p.corner))
        return false;
      if (filters.corner === "straight" && p.corner && p.corner !== "Non")
        return false;
      return true;
    }).sort((a, b) => {
      if (filters.sort === "price-asc") return a.price - b.price;
      if (filters.sort === "price-desc") return b.price - a.price;
      if (filters.sort === "width") return (a.w || 0) - (b.w || 0);
      const fa = FAMILY_ORDER.indexOf(a.family);
      const fb = FAMILY_ORDER.indexOf(b.family);
      if (fa !== fb) return fa - fb;
      return (a.w || 0) - (b.w || 0);
    });
  }, [filters]);

  const familyCounts = useMemo(() => {
    const m: Record<string, number> = {};
    ALL_PRODUCTS.forEach((p) => {
      m[p.family] = (m[p.family] || 0) + 1;
    });
    return m;
  }, []);

  const toggleArr: ToggleArr = (key, value) =>
    setFilters((f) => {
      const arr = f[key] as string[];
      const next = arr.includes(value as string)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...f, [key]: next } as Filters;
    });

  const reset = () =>
    setFilters({
      families: [],
      colors: [],
      moldings: [],
      ceilings: [],
      corner: "all",
      sort: "family",
    });

  const activeFilterCount =
    filters.families.length +
    filters.colors.length +
    filters.moldings.length +
    filters.ceilings.length +
    (filters.corner !== "all" ? 1 : 0);

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-[240px_1fr] grid-rows-[auto_1fr] gap-y-10 px-[clamp(20px,4vw,56px)] pb-[120px] pt-14 [column-gap:56px] max-[1100px]:grid-cols-1 max-[700px]:gap-y-6 max-[700px]:px-[18px] max-[700px]:pb-[60px] max-[700px]:pt-7">
      <CatalogueHead
        total={ALL_PRODUCTS.length}
        filteredCount={filtered.length}
        sort={filters.sort}
        onSortChange={(sort) => setFilters((f) => ({ ...f, sort }))}
        activeFilterCount={activeFilterCount}
        onOpenFilters={() => setFiltersOpen(true)}
      />
      <CatalogueFilters
        filters={filters}
        setCorner={(corner) => setFilters((f) => ({ ...f, corner }))}
        toggleArr={toggleArr}
        familyCounts={familyCounts}
        activeFilterCount={activeFilterCount}
        filteredCount={filtered.length}
        onReset={reset}
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />
      <CatalogueGrid filtered={filtered} onReset={reset} />
    </div>
  );
}
