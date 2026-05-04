import { Eyebrow } from "@/components/legacy/eyebrow";
import { Heading } from "@/components/legacy/heading";
import { COLLECTIONS } from "./_components/data";
import { CollectionFeature } from "./_components/collection-feature";

export const metadata = { title: "Finitions · Dilamco" };

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)]  max-[700px]:px-[18px] max-[700px]:pb-[60px]">
      <header className=" border-b border-border py-[60px] pb-20  max-[700px]:py-8">
        <Eyebrow accent>Finitions 2026</Eyebrow>
        <Heading
          as="h1"
          variant="serif"
          className="my-4 text-[clamp(56px,7vw,110px)] leading-[0.98] tracking-[-0.025em] text-foreground [&_em]:italic [&_em]:text-primary"
        >
          Choisissez votre <br />
          <em>finition.</em>
        </Heading>
        <p className="max-w-[720px] text-[17px] leading-[1.6] text-soft-foreground">
          Trois styles, même modules, même prix.
        </p>
      </header>

      {COLLECTIONS.map((c, i) => (
        <CollectionFeature key={c.id} collection={c} reverse={i % 2 === 1} />
      ))}
    </div>
  );
}
