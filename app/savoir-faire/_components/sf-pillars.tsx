import { Headline, Body, StepLabel } from "@/components/ds";

const PILLARS = [
  { num: "01", t: "L'usine partenaire", b: "Une seule usine. Un protocole de contrôle qualité que nous avons défini avec eux et que nous auditons en personne deux fois par an. Aucun panel de fournisseurs concurrents : la qualité ne se moyenne pas.", stat: "1 / 1", sl: "Usine partenaire" },
  { num: "02", t: "Le conteneur, pas le détaillant", b: "Nous importons en direct, par conteneur dédié. Pas de marge de revendeur, pas de marketplace, pas de \"drop-ship\" depuis l'autre bout du monde au moment où vous commandez.", stat: "12", sl: "Conteneurs / an" },
  { num: "03", t: "L'entrepôt de Montréal", b: "3 200 m² de stock tampon, où chaque module est inspecté à réception avant d'être marqué disponible. Si un panneau a voyagé mal, il ne quitte jamais l'entrepôt.", stat: "3 200", sl: "m² d'entrepôt" },
  { num: "04", t: "L'équipe d'installation", b: "Notre propre équipe, salariée. Pas de sous-traitance. Le chef de projet qui vous a vendu le projet est celui qui le suit jusqu'à la signature de réception.", stat: "0", sl: "Sous-traitants" },
];

export function SfPillars() {
  return (
    <section className="grid grid-cols-4 gap-px border border-border bg-border max-[1100px]:grid-cols-2 max-[700px]:grid-cols-1">
      {PILLARS.map((p) => (
        <article key={p.num} className="flex min-h-[360px] flex-col bg-background p-8">
          <StepLabel className="mb-7">PILIER {p.num}</StepLabel>
          <Headline level="title" as="h3" className="mb-4">
            {p.t}
          </Headline>
          <Body size="sm" tone="soft" className="leading-[1.65]">
            {p.b}
          </Body>
          <div className="mt-auto border-t border-border pt-6">
            <span className="block font-serif text-5xl leading-none tracking-[-0.03em] text-primary">
              {p.stat}
            </span>
            <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              {p.sl}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
