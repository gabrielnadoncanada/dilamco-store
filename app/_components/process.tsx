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
    <section className="px-[clamp(20px,4vw,56px)] py-[clamp(70px,9vw,110px)] max-[700px]:py-14 border-b border-border bg-background">
      <div className="mx-auto mb-14 max-w-[1440px] max-[700px]:mb-8">
        <span className="text-[11px] tracking-[0.18em] uppercase font-medium text-primary">
          Le processus
        </span>
        <h2 className="font-serif text-[clamp(36px,4.5vw,56px)] tracking-[-0.02em] leading-[1.05] max-w-[700px] mt-3">
          Quatre étapes. Aucun intermédiaire. Un seul chef de projet pour vous
          accompagner.
        </h2>
      </div>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 min-[700px]:grid-cols-2 min-[900px]:grid-cols-4">
        {STEPS.map((s) => (
          <div
            key={s.num}
            className="pr-6 py-8 max-[700px]:py-[22px] max-[700px]:pr-0 border-t border-foreground relative"
          >
            <div className="font-mono text-xs text-primary tracking-[0.06em]">
              ÉTAPE {s.num}
            </div>
            <h3 className="font-serif text-[22px] leading-[1.15] mt-3 tracking-[-0.01em]">
              {s.title}
            </h3>
            <p className="text-[13px] text-muted-foreground mt-2.5 leading-[1.6]">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
