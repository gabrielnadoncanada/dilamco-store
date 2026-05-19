import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Headline, Body } from "@/components/ds";
import {
  categories,
  findCategoryBySlug,
  type Locale,
} from "@/lib/catalog-categories";
import { routes } from "@/lib/routes";

const LOCALE: Locale = "fr";

export function generateStaticParams() {
  return categories
    .filter((c) => c.slug[LOCALE])
    .map((c) => ({ slug: c.slug[LOCALE] as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug, LOCALE);
  if (!category) return { title: "Collection · Dilamco" };
  return {
    title: `${category.name[LOCALE] ?? category.name.en} · Collections · Dilamco`,
  };
}

export default async function CollectionCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug, LOCALE);
  if (!category) notFound();

  const subs = category.subcategories.filter((s) => s.slug[LOCALE]);

  return (
    <Container padded className="pb-[120px] pt-14 max-[700px]:pt-7">
      <div className="font-mono text-[11px] tracking-[0.04em] text-muted-foreground [&_a:hover]:text-primary">
        <Link href={routes.collections}>Collections</Link> /{" "}
        <span className="text-foreground">
          {category.name[LOCALE] ?? category.name.en}
        </span>
      </div>

      <header className="mt-4 border-b border-border pb-10">
        <Eyebrow>Collection</Eyebrow>
        <Headline level="headline" as="h1" className="mt-2">
          {category.name[LOCALE] ?? category.name.en}
        </Headline>
      </header>

      {subs.length > 0 ? (
        <section className="mt-10">
          <Eyebrow as="h2">Sous-catégories</Eyebrow>
          <ul className="mt-5 grid grid-cols-3 gap-x-6 gap-y-4 max-[900px]:grid-cols-2 max-[700px]:grid-cols-1">
            {subs.map((s) => (
              <li key={s.slug[LOCALE]}>
                <Link
                  href={routes.subcollection(
                    category.slug[LOCALE] as string,
                    s.slug[LOCALE] as string,
                  )}
                  className="block border border-border bg-card px-5 py-4 text-[13px] text-foreground transition-colors hover:border-foreground"
                >
                  {s.name[LOCALE] ?? s.name.en}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <Body tone="muted" className="mt-10">
          Aucune sous-catégorie pour cette collection.
        </Body>
      )}
    </Container>
  );
}
