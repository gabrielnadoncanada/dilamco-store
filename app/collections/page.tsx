import { Eyebrow } from "@/components/legacy/eyebrow";
import { Heading } from "@/components/legacy/heading";
import { COLLECTIONS } from "./_components/data";
import { CollectionFeature } from "./_components/collection-feature";
import { CollectionCompareTable } from "./_components/collection-compare-table";

export const metadata = { title: "Collections · Dilamco" };

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pb-[120px] max-[700px]:px-[18px] max-[700px]:pb-[60px]">
      <header className="mb-20 border-b border-border py-[60px] pb-20 max-[700px]:mb-10 max-[700px]:py-8">
        <Eyebrow accent>Collections 2026</Eyebrow>
        <Heading
          as="h1"
          variant="serif"
          className="my-4 text-[clamp(56px,7vw,110px)] leading-[0.98] tracking-[-0.025em] text-foreground [&_em]:italic [&_em]:text-primary"
        >
          Trois finis.<br />Trois caractères.<br />
          <em>Une même rigueur.</em>
        </Heading>
        <p className="max-w-[720px] text-[17px] leading-[1.6] text-soft-foreground">
          Nous avons fait un choix : limiter la palette pour pousser la qualité. Trois
          finis Shaker, déclinés sur tous les modules du catalogue, contrôlés à
          l&apos;usine sous le même protocole de teinte.
        </p>
      </header>

      {COLLECTIONS.map((c, i) => (
        <CollectionFeature key={c.id} collection={c} reverse={i % 2 === 1} />
      ))}

      <CollectionCompareTable />
    </div>
  );
}
