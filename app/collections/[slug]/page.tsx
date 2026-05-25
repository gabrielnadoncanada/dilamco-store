import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Headline } from "@/components/ds";
import { PCard } from "@/components/pcard";
import { CollectionsShell } from "../_components/collections-shell";
import {
  categories,
  categoryName,
  findCategoryBySlug,
  getChildren,
} from "@/lib/catalog-categories";
import { hasVisibleProducts, productsInCategory } from "@/lib/products";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return categories
    .filter((c) => c.parent === null && hasVisibleProducts(c.slug))
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  if (!category) return { title: "Collection · Dilamco" };
  return { title: `${categoryName(category)} · Collections · Dilamco` };
}

export default async function CollectionCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  if (!category) notFound();

  const name = categoryName(category);
  const children = getChildren(slug).filter((c) => hasVisibleProducts(c.slug));
  const allProducts = productsInCategory(slug, { deep: true });

  return (
    <CollectionsShell activeSlug={slug}>
      <div className="font-mono text-[11px] tracking-[0.04em] text-muted-foreground [&_a:hover]:text-primary">
        <Link href={routes.collections}>Collections</Link> /{" "}
        <span className="text-foreground">{name}</span>
      </div>

      <header className="mt-4 border-b border-border pb-7">
        <Eyebrow>Collection</Eyebrow>
        <Headline level="headline" as="h1" className="mt-2">
          {name}
        </Headline>
        <p className="mt-3 font-mono text-xs tracking-[0.04em] text-muted-foreground">
          {allProducts.length} module{allProducts.length !== 1 ? "s" : ""}
          {children.length > 0
            ? ` · ${children.length} sous-catégorie${children.length !== 1 ? "s" : ""}`
            : ""}
        </p>
      </header>

      {allProducts.length > 0 ? (
        <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 max-[1100px]:grid-cols-2 max-[700px]:!grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-[18px] max-[380px]:!grid-cols-1">
          {allProducts.slice(0, 60).map((p) => (
            <PCard key={p.code} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 px-5 py-14 text-center text-muted-foreground">
          Aucun module dans cette collection pour le moment.
        </div>
      )}
      {allProducts.length > 60 && (
        <div className="mt-10 text-center text-[13px] text-muted-foreground">
          Affichage 60 sur {allProducts.length}. Naviguez vers une sous-catégorie
          pour affiner.
        </div>
      )}
    </CollectionsShell>
  );
}
