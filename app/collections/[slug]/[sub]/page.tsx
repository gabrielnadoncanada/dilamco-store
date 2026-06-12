import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Headline } from "@/components/ds";
import { CategorySidebar } from "@/components/category-sidebar";
import { CollectionsShell } from "../../_components/collections-shell";
import { ProductGrid } from "../../_components/product-grid";
import { SidebarFilters } from "../../_components/sidebar-filters";
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
  const total = productsInCategory(sub).length;
  const scope = { slug: sub };

  return (
    <CollectionsShell
      activeSlug={sub}
      scope={scope}
      filters={
        <SidebarFilters
          scope={scope}
          activeSlug={sub}
          categories={<CategorySidebar activeSlug={sub} />}
        />
      }
    >
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
          {total} module{total !== 1 ? "s" : ""}
        </p>
      </header>

      <ProductGrid scope={scope} />
    </CollectionsShell>
  );
}
