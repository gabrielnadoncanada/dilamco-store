"use client";

import { Suspense } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CategorySidebar } from "@/components/category-sidebar";
import { type CatalogScope, FINISH_VALUES } from "./filtering";
import {
  FacetOption,
  FINISH_LABELS,
  useCatalogFacets,
} from "./sidebar-filters";

interface Props {
  scope?: CatalogScope;
  activeSlug?: string;
}

/**
 * Facettes mobiles en bottom drawer, calquées sur Amazon/IKEA mobile :
 * groupes repliés (résumé de la sélection dans l'en-tête), recherche en
 * haut, et pied collant « Voir les N modules » qui ferme le drawer.
 */
/** nuqs (useSearchParams) exige un Suspense boundary pour le prerender statique. */
export function MobileFiltersDrawer(props: Props) {
  return (
    <Suspense>
      <MobileFiltersDrawerInner {...props} />
    </Suspense>
  );
}

function MobileFiltersDrawerInner({ scope, activeSlug }: Props) {
  const {
    q,
    setQ,
    width,
    setWidth,
    finish,
    setFinish,
    widthOptions,
    finishOptions,
    resultCount,
    hasActive,
    clearAll,
  } = useCatalogFacets(scope);

  const activeCount =
    (q.trim() ? 1 : 0) + (width !== null ? 1 : 0) + (finish !== null ? 1 : 0);

  return (
    <Drawer>
      <DrawerTrigger className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 cursor-pointer items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[12px] uppercase tracking-[0.1em] text-background shadow-[0_4px_18px_rgba(0,0,0,0.25)] max-[1100px]:flex">
        <SlidersHorizontal className="size-4" />
        Filtrer
        {activeCount > 0 && (
          <span className="flex size-[18px] items-center justify-center rounded-full bg-background font-mono text-[10px] text-foreground">
            {activeCount}
          </span>
        )}
      </DrawerTrigger>
      <DrawerContent className="max-[1100px]:max-h-[85vh]">
        <DrawerTitle className="border-b border-border px-5 pb-3.5 pt-1 font-serif text-lg font-normal tracking-[-0.01em] text-foreground">
          Filtrer
        </DrawerTitle>

        <div className="flex-1 overflow-y-auto px-5">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nom ou code (ex. B18)…"
            aria-label="Rechercher un module"
            className="mt-4 w-full border border-border-strong bg-card px-3.5 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary"
          />

          <Accordion type="multiple" className="mt-2">
            <AccordionItem value="categories" className="border-border">
              <AccordionTrigger className="py-4 text-[14px] hover:no-underline">
                <span className="flex w-full items-baseline justify-between pr-3">
                  Catégories
                  <span className="font-mono text-[11px] font-normal text-muted-foreground" />
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <CategorySidebar activeSlug={activeSlug} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="finition" className="border-border">
              <AccordionTrigger className="py-4 text-[14px] hover:no-underline">
                <span className="flex w-full items-baseline justify-between pr-3">
                  Finition
                  <span className="font-mono text-[11px] font-normal text-primary">
                    {finish ? FINISH_LABELS[finish] : ""}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col">
                  {FINISH_VALUES.map((f) => (
                    <FacetOption
                      key={f}
                      label={FINISH_LABELS[f]}
                      count={finishOptions[f]}
                      active={finish === f}
                      disabled={finishOptions[f] === 0}
                      onClick={() => setFinish(finish === f ? null : f)}
                    />
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="largeur" className="border-border">
              <AccordionTrigger className="py-4 text-[14px] hover:no-underline">
                <span className="flex w-full items-baseline justify-between pr-3">
                  Largeur
                  <span className="font-mono text-[11px] font-normal text-primary">
                    {width !== null ? `${width} po` : ""}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid grid-cols-2">
                  {widthOptions.map(([w, count]) => (
                    <FacetOption
                      key={w}
                      label={`${w} po`}
                      count={count}
                      active={width === w}
                      disabled={count === 0}
                      onClick={() => setWidth(width === w ? null : w)}
                    />
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex items-center gap-3 border-t border-border bg-background p-4 pb-6">
          {hasActive && (
            <button
              onClick={clearAll}
              className="shrink-0 cursor-pointer px-3 py-3 text-[12px] text-soft-foreground underline underline-offset-2"
            >
              Effacer
            </button>
          )}
          <DrawerClose className="flex-1 cursor-pointer bg-primary px-6 py-3.5 text-center text-[12px] uppercase tracking-[0.1em] text-primary-foreground">
            Voir {resultCount} module{resultCount !== 1 ? "s" : ""}
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
