"use client";

import { Swatch } from "@/components/swatch";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CEILINGS_ALL, COLORS_ALL, FAMILY_ORDER, MOLDINGS_ALL } from "./types";
import type { CornerFilter, Filters, ToggleArr } from "./types";
import { cn } from "@/lib/utils";

const filterLabel =
  "mb-3.5 border-b border-border pb-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground";
const filterList = "flex flex-col gap-2";
const filterItem =
  "flex cursor-pointer items-center gap-2.5 py-1 text-[13px] text-soft-foreground transition-colors hover:text-primary";
const filterCheckbox =
  "relative size-3.5 shrink-0 appearance-none rounded-[1px] border border-border-strong bg-card checked:border-primary checked:bg-primary checked:after:absolute checked:after:left-[3px] checked:after:top-0 checked:after:block checked:after:h-[9px] checked:after:w-[5px] checked:after:rotate-45 checked:after:border-b-[1.5px] checked:after:border-r-[1.5px] checked:after:border-background checked:after:content-['']";
const chipBase =
  "inline-flex cursor-pointer items-center border border-border-strong bg-card px-3.5 py-[7px] text-xs tracking-[0.04em] text-soft-foreground transition-colors hover:border-foreground";
const filterClear =
  "mt-2 self-start border-b border-current px-0 py-1.5 text-left text-[11px] uppercase tracking-[0.1em] text-destructive";

interface BodyProps {
  filters: Filters;
  setCorner: (v: CornerFilter) => void;
  toggleArr: ToggleArr;
  familyCounts: Record<string, number>;
  activeFilterCount: number;
  onReset: () => void;
}

function FiltersBody({
  filters,
  setCorner,
  toggleArr,
  familyCounts,
  activeFilterCount,
  onReset,
}: BodyProps) {
  return (
    <>
      <div>
        <div className={filterLabel}>Famille</div>
        <div className={filterList}>
          {FAMILY_ORDER.filter((f) => familyCounts[f]).map((f) => (
            <label key={f} className={filterItem}>
              <input
                className={filterCheckbox}
                type="checkbox"
                checked={filters.families.includes(f)}
                onChange={() => toggleArr("families", f)}
              />
              {f}
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                {familyCounts[f]}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className={filterLabel}>Couleur</div>
        <div className={filterList}>
          {COLORS_ALL.map((c) => (
            <label key={c} className={filterItem}>
              <input
                className={filterCheckbox}
                type="checkbox"
                checked={filters.colors.includes(c)}
                onChange={() => toggleArr("colors", c)}
              />
              <Swatch color={c} />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className={filterLabel}>Moulure Shaker</div>
        <div className="flex flex-wrap gap-1.5">
          {MOLDINGS_ALL.map((m) => (
            <button
              key={m}
              className={cn(
                chipBase,
                filters.moldings.includes(m) &&
                  "border-primary bg-primary text-primary-foreground",
              )}
              onClick={() => toggleArr("moldings", m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className={filterLabel}>Hauteur de plafond</div>
        <div className="flex flex-wrap gap-1.5">
          {CEILINGS_ALL.map((c) => (
            <button
              key={c}
              className={cn(
                chipBase,
                filters.ceilings.includes(c) &&
                  "border-primary bg-primary text-primary-foreground",
              )}
              onClick={() => toggleArr("ceilings", c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button className={filterClear} onClick={onReset}>
          Réinitialiser les filtres ({activeFilterCount})
        </button>
      )}
    </>
  );
}

interface Props extends BodyProps {
  filteredCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export function CatalogueFilters({
  filteredCount,
  isOpen,
  onClose,
  ...body
}: Props) {
  return (
    <>
      <aside className="sticky top-[120px] flex max-h-[calc(100vh-140px)] flex-col gap-8 self-start overflow-y-auto pr-2 text-[13px] max-[1100px]:hidden">
        <FiltersBody {...body} />
      </aside>

      <Drawer
        direction="right"
        open={isOpen}
        onOpenChange={(o) => {
          if (!o) onClose();
        }}
      >
        <DrawerContent
          className="bg-background w-[min(380px,92vw)] sm:max-w-none border-l-0 p-0 flex flex-col"
          aria-describedby={undefined}
        >
          <DrawerTitle className="sr-only">Filtres</DrawerTitle>
          <div className="flex justify-between items-center px-[22px] py-[18px] border-b border-border sticky top-0 bg-background z-10">
            <span className="font-serif text-[22px] tracking-[-0.01em] text-foreground">
              Filtres
            </span>
            <DrawerClose
              aria-label="Fermer"
              className="bg-transparent border-0 cursor-pointer text-[28px] leading-none w-9 h-9 flex items-center justify-center text-foreground"
            >
              ×
            </DrawerClose>
          </div>
          <div className="flex-1 overflow-y-auto px-[22px] py-4 flex flex-col gap-[22px] text-[13px]">
            <FiltersBody {...body} />
          </div>
          <button
            onClick={onClose}
            className="sticky bottom-0 bg-primary text-background border-0 px-4 py-4 text-xs tracking-[0.08em] uppercase font-medium cursor-pointer"
          >
            Voir {filteredCount} module{filteredCount !== 1 ? "s" : ""}
          </button>
        </DrawerContent>
      </Drawer>
    </>
  );
}
