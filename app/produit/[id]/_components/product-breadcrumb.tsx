import Link from "next/link";
import type { Product } from "@/lib/types";
import { collectionsFilter, routes } from "@/lib/routes";

export function ProductBreadcrumb({ product }: { product: Product }) {
  return (
    <div className="flex flex-wrap py-4 pb-8 font-mono text-[11px] tracking-[0.04em] gap-1 text-muted-foreground [&_a:hover]:text-primary [&_span]:text-foreground max-[700px]:text-[11px]">
      <Link href={routes.home}>Accueil</Link> /{" "}
      <Link href={routes.collections}>Collections</Link> /{" "}
      <Link href={collectionsFilter.family(product.family)}>
        {product.family}
      </Link>{" "}
      / <span>{product.id}</span>
    </div>
  );
}
