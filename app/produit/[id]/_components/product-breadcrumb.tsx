import Link from "next/link";
import type { Product } from "@/lib/types";

export function ProductBreadcrumb({ product }: { product: Product }) {
  return (
    <div className="flex flex-wrap py-4 pb-8 font-mono text-[11px] tracking-[0.04em] gap-1 text-muted-foreground [&_a:hover]:text-primary [&_span]:text-foreground max-[700px]:text-[11px]">
      <Link href="/">Accueil</Link> / <Link href="/catalogue">Catalogue</Link> /{" "}
      <Link href={`/catalogue?famille=${encodeURIComponent(product.family)}`}>
        {product.family}
      </Link>{" "}
      / <span>{product.id}</span>
    </div>
  );
}
