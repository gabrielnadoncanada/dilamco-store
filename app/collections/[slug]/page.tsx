import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Headline } from "@/components/ds";
import { CategorySidebar } from "@/components/category-sidebar";
import { CollectionsShell } from "../_components/collections-shell";
import { ProductGrid } from "../_components/product-grid";
import { SidebarFilters } from "../_components/sidebar-filters";
import {
  categories,
  categoryName,
  findCategoryBySlug,
  getChildren,
} from "@/lib/catalog-categories";
import { hasVisibleProducts, productsInCategory } from "@/lib/products";
import { routes } from "@/lib/routes";
import { pluralTitle } from "../_components/types";

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
  const title = pluralTitle(name);
  const children = getChildren(slug).filter((c) => hasVisibleProducts(c.slug));
  const total = productsInCategory(slug, { deep: true }).length;
  const scope = { slug, deep: true };

  return (
    <CollectionsShell
      activeSlug={slug}
      scope={scope}
      filters={
        <SidebarFilters
          scope={scope}
          activeSlug={slug}
          categories={<CategorySidebar activeSlug={slug} />}
        />
      }
    >
      <div className="font-mono text-[11px] tracking-[0.04em] text-muted-foreground [&_a:hover]:text-primary">
        <Link href={routes.collections}>Collections</Link> /{" "}
        <span className="text-foreground">{title}</span>
      </div>

      <header className="mt-4 border-b border-border pb-7">
        <Eyebrow>Collection</Eyebrow>
        <Headline level="headline" as="h1" className="mt-2">
          {title}
        </Headline>
        <p className="mt-3 font-mono text-xs tracking-[0.04em] text-muted-foreground">
          {total} module{total !== 1 ? "s" : ""}
          {children.length > 0
            ? ` · ${children.length} sous-catégorie${children.length !== 1 ? "s" : ""}`
            : ""}
        </p>
      </header>

      <ProductGrid scope={scope} />
    </CollectionsShell>
  );
}
