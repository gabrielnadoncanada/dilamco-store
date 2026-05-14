import { Container, Eyebrow, Headline, Body } from "@/components/ds";
import { COLLECTIONS } from "./_components/data";
import { CollectionFeature } from "./_components/collection-feature";

export const metadata = { title: "Finitions · Dilamco" };

export default function CollectionsPage() {
  return (
    <Container padded className="max-[700px]:pb-[60px]">
      <header className="border-b border-border py-[60px] pb-20 max-[700px]:py-8">
        <Eyebrow>Finitions 2026</Eyebrow>
        <Headline level="display" as="h1" className="my-4 ">
          Choisissez votre <br />
          <em>finition.</em>
        </Headline>
        <Body size="lead" tone="soft" className="max-w-[720px]">
          Trois styles, même modules, même prix.
        </Body>
      </header>

      {COLLECTIONS.map((c, i) => (
        <CollectionFeature key={c.id} collection={c} reverse={i % 2 === 1} />
      ))}
    </Container>
  );
}
