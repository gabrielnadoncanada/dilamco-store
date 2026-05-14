import {
  Section,
  Container,
  SectionHeading,
  HairlineGrid,
  HairlineCell,
  StepLabel,
  Headline,
} from "@/components/ds";

const PILLARS = [
  {
    num: "01",
    title: "Parcourez notre catalogue.",
    body: "Découvrez nos modules, dimensions et prix en quelques clics.",
  },
  {
    num: "02",
    title: "Ajoutez vos armoires au panier.",
    body: "Créez votre cuisine en sélectionnant les modules adaptés à votre espace.",
  },
  {
    num: "03",
    title: "Envoyez votre soumission.",
    body: "Soumettez votre panier pour validation et ajustements au besoin.",
  },
  {
    num: "04",
    title: "Validation rapide et livraison.",
    body: "Nous validons votre projet rapidement avant de préparer et livrer votre commande.",
  },
];

export function Pillars() {
  return (
    <Section
      surface="background"
      className="py-[clamp(80px,10vw,140px)] max-[700px]:py-14"
    >
      <Container>
        <SectionHeading
          eyebrow="Soumission d'armoires en ligne"
          title="Obtenez votre cuisine en 4 étapes."
          className="mb-14 max-[700px]:mb-10"
        />
        <HairlineGrid cols="4">
          {PILLARS.map((p) => (
            <HairlineCell key={p.num}>
              <StepLabel className="mb-7">ÉTAPE {p.num}</StepLabel>
              <Headline level="title" as="h3" className="mb-4">
                {p.title}
              </Headline>
              <p className="text-sm leading-[1.6] text-muted-foreground flex-1">
                {p.body}
              </p>
            </HairlineCell>
          ))}
        </HairlineGrid>
      </Container>
    </Section>
  );
}
