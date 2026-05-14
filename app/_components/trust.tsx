import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";
import {
  Section,
  Container,
  SectionHeading,
  HairlineGrid,
  HairlineCell,
  Body,
} from "@/components/ds";

const STATS: Array<[string, string]> = [
  ["20+", "Années d'expérience"],
  ["217", "Modules pour votre projet, sur mesure disponible"],
  ["48h", "Délai garanti pour une soumission ferme"],
  ["10 ans", "Garantie complète sur les modules"],
];

export function Trust() {
  return (
    <Section surface="primary" divider={false}>
      <Container>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-20">
          <div>
            <SectionHeading
              eyebrow="L'offre derrière le produit"
              title="Une offre simple, basée sur du concret."
              tone="on-primary"
              titleClassName="text-background"
            />
            <Body
              size="default"
              tone="on-primary"
              className="mt-6 max-w-[480px] leading-[1.65]"
            >
              Nous misons sur des standards simples : qualité des matériaux,
              disponibilité des modules et rapidité d&apos;exécution.
            </Body>
            <Button
              asChild
              variant="paper"
              className="mt-8 uppercase tracking-wider"
            >
              <Link href="/catalogue">
                Créer ma cuisine <ButtonArrow />
              </Link>
            </Button>
          </div>
          <HairlineGrid cols="2" tone="onPrimary">
            {STATS.map(([num, lbl]) => (
              <HairlineCell
                key={num}
                surface="primary"
                className="p-8 max-[700px]:p-[22px]"
              >
                <div className="font-serif text-[64px] leading-none tracking-[-0.02em] text-highlight max-[700px]:text-[44px]">
                  {num}
                </div>
                <Body size="compact" tone="on-primary" className="mt-3 leading-[1.5]">
                  {lbl}
                </Body>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </div>
      </Container>
    </Section>
  );
}
