import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const SIZES = {
  /** Lignes de panier, sous-totaux. */
  sm: { int: "text-[13px] font-medium", rest: "text-[11px]" },
  /** Cartes produit, totaux de panneaux. */
  md: {
    int: "text-[22px] font-semibold tracking-[-0.01em] max-[700px]:text-[17px]",
    rest: "text-[12px] font-medium max-[700px]:text-[11px]",
  },
  /** Prix dominant de la fiche produit. */
  lg: {
    int: "text-[32px] font-semibold leading-none tracking-[-0.01em] max-[700px]:text-[26px]",
    rest: "text-[15px] font-medium max-[700px]:text-[13px]",
  },
} as const;

/**
 * Prix transactionnel unifié : entier proéminent, décimales + symbole en
 * retrait, toujours en mono. Une seule voix pour tous les prix du parcours
 * d'achat (cartes, fiche, panier, soumission). Les montants éditoriaux de la
 * home (hero, forfaits) restent en serif — c'est l'exception assumée.
 */
export function Price({
  amount,
  size = "md",
  className,
}: {
  amount: number;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const [int, rest] = formatPrice(amount).split(",");
  const s = SIZES[size];
  return (
    <span
      className={cn(
        "font-mono text-foreground group-data-[show-prices=false]/body:hidden",
        className,
      )}
    >
      <span className={s.int}>{int}</span>
      <span className={s.rest}>,{rest}</span>
    </span>
  );
}
