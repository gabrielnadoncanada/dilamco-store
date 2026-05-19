"use client";

import { useMemo, useState } from "react";
import { products as ALL_PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/types";
import { Container } from "@/components/ds";
import { CollectionsHead } from "./_components/collections-head";
import { CollectionsFilters } from "./_components/collections-filters";
import { CollectionsGrid } from "./_components/collections-grid";
import {
  FAMILY_ORDER,
  useCollectionsFilters,
  type CornerFilter,
  type FilterArrayKey,
  type Filters,
  type SortKey,
  type ToggleArr,
} from "./_components/types";

export default function CollectionsClient() {
  const [filters, setFilters] = useCollectionsFilters();
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const toggleArr: ToggleArr = (key, value) => {
    const arr = filters[key] as string[];
    const next = arr.includes(value as string)
      ? arr.filter((v) => v !== value)
      : [...arr, value as string];
    setFilters({ [key]: next } as Partial<Pick<Filters, FilterArrayKey>>);
  };

  const reset = () => setFilters(null);

  const activeFilterCount =
    filters.families.length +
    filters.colors.length +
    filters.moldings.length +
    filters.ceilings.length +
    (filters.corner !== "all" ? 1 : 0);

  return (
    <Container
      padded
      className="grid grid-cols-[240px_1fr] grid-rows-[auto_1fr] gap-y-10 pb-[120px] pt-14 [column-gap:56px] max-[1100px]:grid-cols-1 max-[700px]:gap-y-6 max-[700px]:pb-[60px] max-[700px]:pt-7"
    >
      <CollectionsHead
        total={ALL_PRODUCTS.length}
        filteredCount={filtered.length}
        sort={filters.sort}
        onSortChange={(sort: SortKey) => setFilters({ sort })}
        activeFilterCount={activeFilterCount}
        onOpenFilters={() => setFiltersOpen(true)}
      />
      <CollectionsFilters
        filters={filters as Filters}
        setCorner={(corner: CornerFilter) => setFilters({ corner })}
        toggleArr={toggleArr}
        familyCounts={familyCounts}
        activeFilterCount={activeFilterCount}
        filteredCount={filtered.length}
        onReset={reset}
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />
      <CollectionsGrid filtered={filtered} onReset={reset} />
    </Container>
  );
}
