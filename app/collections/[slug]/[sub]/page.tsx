import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Headline, Body } from "@/components/ds";
import {
  categories,
  findCategoryBySlug,
  findSubcategoryBySlug,
  type Locale,
} from "@/lib/catalog-categories";
import { routes } from "@/lib/routes";

const LOCALE: Locale = "fr";

export function generateStaticParams() {
  const params: Array<{ slug: string; sub: string }> = [];
  for (const category of categories) {
    const catSlug = category.slug[LOCALE];
    if (!catSlug) continue;
    for (const sub of category.subcategories) {
      const subSlug = sub.slug[LOCALE];
      if (!subSlug) continue;
      params.push({ slug: catSlug, sub: subSlug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const category = findCategoryBySlug(slug, LOCALE);
  if (!category) return { title: "Collection · Dilamco" };
  const subcategory = findSubcategoryBySlug(category, sub, LOCALE);
  if (!subcategory) return { title: "Collection · Dilamco" };
  const catName = category.name[LOCALE] ?? category.name.en ?? "";
  const subName = subcategory.name[LOCALE] ?? subcategory.name.en ?? "";
  return {
    title: `${subName} · ${catName} · Dilamco`,
  };
}

export default async function CollectionSubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const category = findCategoryBySlug(slug, LOCALE);
  if (!category) notFound();
  const subcategory = findSubcategoryBySlug(category, sub, LOCALE);
  if (!subcategory) notFound();

  const catName = category.name[LOCALE] ?? category.name.en;
  const subName = subcategory.name[LOCALE] ?? subcategory.name.en;

  return (
    <Container padded className="pb-[120px] pt-14 max-[700px]:pt-7">
      <div className="font-mono text-[11px] tracking-[0.04em] text-muted-foreground [&_a:hover]:text-primary">
        <Link href={routes.collections}>Collections</Link> /{" "}
        <Link href={routes.collection(slug)}>{catName}</Link> /{" "}
        <span className="text-foreground">{subName}</span>
      </div>

      <header className="mt-4 border-b border-border pb-10">
        <Eyebrow>
          {catName}
        </Eyebrow>
        <Headline level="headline" as="h1" className="mt-2">
          {subName}
        </Headline>
      </header>

      <Body tone="muted" className="mt-10">
        Les modules de cette sous-catégorie seront affichés ici.
      </Body>
    </Container>
  );
}
