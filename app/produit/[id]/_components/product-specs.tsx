import { Heading } from "@/components/legacy/heading";
import type { Product } from "@/lib/types";

export function ProductSpecs({ product }: { product: Product }) {
  return (
    <div className="mt-6 border-t border-border pt-7">
      <Heading
        as="h4"
        className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
      >
        Spécifications techniques
      </Heading>
      <dl className="mt-4 grid grid-cols-[1fr_1.3fr] gap-y-2 max-[700px]:grid-cols-1 max-[700px]:gap-y-2 [&_dd]:m-0 [&_dd]:font-mono [&_dd]:text-xs [&_dd]:text-foreground [&_dt]:border-b [&_dt]:border-border [&_dt]:py-2.5 [&_dt]:text-xs [&_dt]:text-muted-foreground [&_dd]:border-b [&_dd]:border-border [&_dd]:py-2.5">
        <dt>Largeur</dt>
        <dd>{product.w} po</dd>
        <dt>Profondeur</dt>
        <dd>{product.d} po</dd>
        <dt>Hauteur</dt>
        <dd>{product.h} po</dd>
        <dt>Plafond</dt>
        <dd>{product.ceiling || "—"}</dd>
        <dt>Portes</dt>
        <dd>{product.doors}</dd>
        <dt>Configuration</dt>
        <dd>
          {product.corner === "Non" || !product.corner ? "Droite" : product.corner}
        </dd>
        <dt>Caisson</dt>
        <dd>Contreplaqué 5/8″ · placage bouleau intérieur</dd>
        <dt>Porte</dt>
        <dd>HDF + moulure bouleau massif</dd>
        <dt>Quincaillerie</dt>
        <dd>Blum, fermeture amortie</dd>
        <dt>Garantie</dt>
        <dd>10 ans caisson + quincaillerie</dd>
      </dl>
    </div>
  );
}
