import {
  Section,
  Container,
  SectionHeading,
  StepLabel,
  Headline,
  Body,
} from "@/components/ds";

const STEPS = [
  {
    num: "01",
    title: "Premier appel",
    body: "20 minutes pour cerner votre projet, votre budget, vos contraintes. Aucun engagement.",
  },
  {
    num: "02",
    title: "Mesures + dessins",
    body: "Visite à domicile, plans 2D + rendus 3D, choix des modules et finis Shaker.",
  },
  {
    num: "03",
    title: "Soumission ferme",
    body: "Prix final sous 48h, incluant panneaux, fillers, livraison et installation.",
  },
  {
    num: "04",
    title: "Pose en 1 à 3 jours",
    body: "Notre équipe d'installation, jamais sous-traitée. Garantie 10 ans sur les caissons.",
  },
];

export function Process() {
  return (
    <Section surface="background" density="compact">
      <Container>
        <SectionHeading
          eyebrow="Le processus"
          title="Quatre étapes. Aucun intermédiaire. Un seul chef de projet pour vous accompagner."
          titleClassName="max-w-[700px]"
          className="mb-14 max-[700px]:mb-8"
        />
        <div className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[900px]:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="pr-6 py-8 max-[700px]:py-[22px] max-[700px]:pr-0 border-t border-foreground relative"
            >
              <StepLabel className="text-xs tracking-[0.06em]">
                ÉTAPE {s.num}
              </StepLabel>
              <Headline level="subtitle" as="h3" className="mt-3">
                {s.title}
              </Headline>
              <Body size="compact" tone="muted" className="mt-2.5">
                {s.body}
              </Body>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
