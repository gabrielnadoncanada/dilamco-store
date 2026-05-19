"use client";

import { PCard } from "@/components/pcard";
import type { Product } from "@/lib/types";

interface Props {
  filtered: Product[];
  onReset: () => void;
}

export function CollectionsGrid({ filtered, onReset }: Props) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-8 min-[1101px]:group-data-[density=dense]/body:grid-cols-4 max-[1100px]:grid-cols-2 max-[700px]:!grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-[18px] max-[380px]:!grid-cols-1">
        {filtered.slice(0, 60).map((p) => (
          <PCard key={p.id} product={p} />
        ))}
      </div>
      {filtered.length > 60 && (
        <div className="mt-14 text-center text-[13px] text-muted-foreground">
          Affichage 60 sur {filtered.length}. Affinez les filtres pour voir le reste.
        </div>
      )}
      {filtered.length === 0 && (
        <div className="px-5 py-20 text-center text-muted-foreground">
          Aucun module ne correspond à ces critères.
          <br />
          <button
            className="mt-4 border-b border-current px-0 py-1.5 text-[11px] uppercase tracking-[0.1em] text-destructive"
            onClick={onReset}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
