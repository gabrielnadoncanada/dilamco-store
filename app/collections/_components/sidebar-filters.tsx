"use client";

import { Suspense, useMemo } from "react";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs";
import { cn } from "@/lib/utils";
import {
  applyFilters,
  baseProducts,
  FINISH_VALUES,
  type CatalogScope,
  type FinishKey,
} from "./filtering";

export const FINISH_LABELS: Record<FinishKey, string> = {
  blanc: "Blanc Pur",
  chene: "Chêne blanc",
};

/**
 * État + options des facettes catalogue (URL via nuqs) — partagé entre la
 * colonne desktop et le bottom drawer mobile. Compteurs à la Amazon :
 * chaque facette est calculée avec les autres facettes actives.
 */
export function useCatalogFacets(scope?: CatalogScope) {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
  const [width, setWidth] = useQueryState("largeur", parseAsInteger);
  const [finish, setFinish] = useQueryState(
    "fini",
    parseAsStringLiteral(FINISH_VALUES),
  );

  const base = useMemo(() => baseProducts(scope), [scope]);
  const state = { q, width, finish };

  const widthOptions = useMemo(() => {
    const pool = applyFilters(base, state, "width");
    const counts = new Map<number, number>();
    for (const p of pool) {
      if (p.w) counts.set(p.w, (counts.get(p.w) ?? 0) + 1);
    }
    // Sur l'index complet, on s'en tient aux largeurs standards pour éviter
    // 27 options ; dans une catégorie, toutes ses largeurs sont pertinentes.
    const minCount = scope ? 1 : 4;
    return [...counts.entries()]
      .filter(([, n]) => n >= minCount)
      .sort(([a], [b]) => a - b);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, q, finish, scope]);

  const finishOptions = useMemo(() => {
    const pool = applyFilters(base, state, "finish");
    const blanc = pool.filter((p) => !p.code.endsWith("-muf")).length;
    const chene = pool.length - blanc;
    return { blanc, chene };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, q, width]);

  const resultCount = useMemo(
    () => applyFilters(base, state).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [base, q, width, finish],
  );

  const hasActive = q.trim() !== "" || width !== null || finish !== null;
  const clearAll = () => {
    setQ("");
    setWidth(null);
    setFinish(null);
  };

  return {
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
  };
}

const SORT_LABELS: Array<[string, string]> = [
  ["family", "Famille"],
  ["price-asc", "Prix croissant"],
  ["price-desc", "Prix décroissant"],
  ["width", "Largeur"],
];

/**
 * Colonne de gauche façon IKEA : groupes repliés (Trier, Catégories,
 * Finition, Largeur) avec résumé de la sélection dans l'en-tête.
 */
/** nuqs (useSearchParams) exige un Suspense boundary pour le prerender statique. */
export function SidebarFilters(props: {
  scope?: CatalogScope;
  activeSlug?: string;
  categories?: React.ReactNode;
}) {
  return (
    <Suspense>
      <SidebarFiltersInner {...props} />
    </Suspense>
  );
}

function SidebarFiltersInner({
  scope,
  activeSlug,
  categories,
}: {
  scope?: CatalogScope;
  activeSlug?: string;
  categories?: React.ReactNode;
}) {
  const {
    q,
    setQ,
    width,
    setWidth,
    finish,
    setFinish,
    widthOptions,
    finishOptions,
    hasActive,
    clearAll,
  } = useCatalogFacets(scope);
  const [sort, setSort] = useQueryState(
    "tri",
    parseAsString.withDefault("family"),
  );

  return (
    <div className="flex flex-col text-[13px]">
      <div className="flex items-baseline justify-between pb-3">
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Filtrer
        </span>
        {hasActive && (
          <button
            className="cursor-pointer text-[11px] text-primary underline underline-offset-2 hover:opacity-80"
            onClick={clearAll}
          >
            Effacer les filtres
          </button>
        )}
      </div>

      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Nom ou code (ex. B18)…"
        aria-label="Rechercher un module"
        className="mb-2 border border-border-strong bg-card px-3 py-2.5 text-[13px] text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary"
      />

      <SidebarGroup
        label="Trier"
        summary={SORT_LABELS.find(([v]) => v === sort)?.[1]}
      >
        <ul className="flex flex-col">
          {SORT_LABELS.map(([value, label]) => (
            <li key={value}>
              <button
                onClick={() => setSort(value)}
                aria-pressed={sort === value}
                className={
                  "flex w-full cursor-pointer items-center gap-2.5 px-2 py-[7px] text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary " +
                  (sort === value
                    ? "bg-secondary font-medium text-foreground"
                    : "text-soft-foreground hover:text-primary")
                }
              >
                <span
                  aria-hidden
                  className={
                    "inline-block size-[14px] rounded-full border " +
                    (sort === value
                      ? "border-primary bg-primary shadow-[inset_0_0_0_2.5px_var(--background,#fff)]"
                      : "border-border-strong bg-card")
                  }
                />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </SidebarGroup>

      {categories && (
        <SidebarGroup label="Catégories" defaultOpen={Boolean(activeSlug)}>
          {categories}
        </SidebarGroup>
      )}

      <SidebarGroup
        label="Finition"
        summary={finish ? FINISH_LABELS[finish] : undefined}
      >
        <ul className="flex flex-col">
          {FINISH_VALUES.map((f) => {
            const count = finishOptions[f];
            return (
              <FacetOption
                key={f}
                label={FINISH_LABELS[f]}
                count={count}
                active={finish === f}
                disabled={count === 0}
                onClick={() => setFinish(finish === f ? null : f)}
              />
            );
          })}
        </ul>
      </SidebarGroup>

      <SidebarGroup
        label="Largeur"
        summary={width !== null ? `${width} po` : undefined}
      >
        <ul className="flex flex-col">
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
      </SidebarGroup>
    </div>
  );
}

/** Groupe repliable de la sidebar (chevron + résumé de sélection), façon IKEA. */
function SidebarGroup({
  label,
  summary,
  defaultOpen = false,
  children,
}: {
  label: string;
  summary?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group/g border-t border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 text-[13px] text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
        <span>{label}</span>
        <span className="flex items-center gap-2">
          {summary && (
            <span className="font-mono text-[11px] text-primary">{summary}</span>
          )}
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="size-3.5 text-muted-foreground transition-transform group-open/g:rotate-180"
          >
            <path
              d="M3 6l5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

export function FacetGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-2 px-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </legend>
      <ul className="flex flex-col">{children}</ul>
    </fieldset>
  );
}

export function FacetOption({
  label,
  count,
  active,
  disabled,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        disabled={disabled && !active}
        aria-pressed={active}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-3 px-2 py-[7px] text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
          active
            ? "bg-secondary font-medium text-foreground"
            : "text-soft-foreground hover:text-primary",
          disabled && !active && "cursor-default opacity-40",
        )}
      >
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden
            className={cn(
              "inline-block size-[14px] border",
              active
                ? "border-primary bg-primary shadow-[inset_0_0_0_2.5px_var(--background,#fff)]"
                : "border-border-strong bg-card",
            )}
          />
          {label}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {count}
        </span>
      </button>
    </li>
  );
}
