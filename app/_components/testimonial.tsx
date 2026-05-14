import { Section, Container, Eyebrow } from "@/components/ds";

export function Testimonial() {
  return (
    <Section surface="secondary" density="tall">
      <Container className="text-center">
        <p className="font-serif italic text-[clamp(28px,3.6vw,48px)] max-[700px]:text-[22px] leading-[1.2] max-[700px]:leading-[1.3] tracking-[-0.01em] max-w-[1000px] mx-auto text-foreground m-0">
          « On a visité la salle de montre, on est tombé en amour avec les
          armoires. Commande rapide, installation solide, et aujourd&apos;hui
          tout est parfaitement en place. Honnêtement, la qualité est
          au-dessus de la compétition. »
        </p>
        <Eyebrow tone="muted" className="mt-8">
          Annie · Estrie · Cuisine, salle de bain et walkin
        </Eyebrow>
      </Container>
    </Section>
  );
}
