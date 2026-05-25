import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Headline } from "@/components/ds";
import { PCard } from "@/components/pcard";
import { CollectionsShell } from "../../_components/collections-shell";
import {
  categories,
  categoryName,
  findCategoryBySlug,
} from "@/lib/catalog-categories";
import { hasVisibleProducts, productsInCategory } from "@/lib/products";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  const params: Array<{ slug: string; sub: string }> = [];
  for (const child of categories) {
    if (!child.parent) continue;
    if (!hasVisibleProducts(child.slug)) continue;
    params.push({ slug: child.parent, sub: child.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const parent = findCategoryBySlug(slug);
  const subCat = findCategoryBySlug(sub);
  if (!parent || !subCat || subCat.parent !== slug) {
    return { title: "Collection · Dilamco" };
  }
  return {
    title: `${categoryName(subCat)} · ${categoryName(parent)} · Dilamco`,
  };
}

export default async function CollectionSubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const parent = findCategoryBySlug(slug);
  const subCat = findCategoryBySlug(sub);
  if (!parent || !subCat || subCat.parent !== slug) notFound();

  const parentName = categoryName(parent);
  const subName = categoryName(subCat);
  const items = productsInCategory(sub);

  return (
    <CollectionsShell activeSlug={sub}>
      <div className="font-mono text-[11px] tracking-[0.04em] text-muted-foreground [&_a:hover]:text-primary">
        <Link href={routes.collections}>Collections</Link> /{" "}
        <Link href={routes.collection(slug)}>{parentName}</Link> /{" "}
        <span className="text-foreground">{subName}</span>
      </div>

      <header className="mt-4 border-b border-border pb-7">
        <Eyebrow>{parentName}</Eyebrow>
        <Headline level="headline" as="h1" className="mt-2">
          {subName}
        </Headline>
        <p className="mt-3 font-mono text-xs tracking-[0.04em] text-muted-foreground">
          {items.length} module{items.length !== 1 ? "s" : ""}
        </p>
      </header>

      {items.length > 0 ? (
        <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 max-[1100px]:grid-cols-2 max-[700px]:!grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-[18px] max-[380px]:!grid-cols-1">
          {items.map((p) => (
            <PCard key={p.code} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 px-5 py-14 text-center text-muted-foreground">
          Aucun module dans cette sous-catégorie pour le moment.
        </div>
      )}
    </CollectionsShell>
  );
}
