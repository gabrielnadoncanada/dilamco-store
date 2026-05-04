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
    <section className="px-[clamp(20px,4vw,56px)] py-[clamp(80px,10vw,140px)] max-[700px]:py-14 bg-background border-b border-border">
      <div className="mx-auto mb-20 max-w-[1440px] max-[700px]:mb-10">
        <span className="text-[11px] tracking-[0.18em] uppercase font-medium text-primary">
          Soumission d&apos;armoires en ligne
        </span>
        <h2 className="font-serif text-[clamp(34px,4.5vw,62px)] tracking-[-0.02em] leading-[1.02] mt-3">
          Obtenez votre cuisine en 4 étapes.
        </h2>
      </div>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-px border border-border bg-border min-[700px]:grid-cols-2 min-[1101px]:grid-cols-4">
        {PILLARS.map((p) => (
          <div
            key={p.num}
            className="bg-background p-10 max-[700px]:p-[22px] flex flex-col"
          >
            <div className="font-mono text-[11px] text-primary tracking-[0.08em] mb-7">
              ÉTAPE {p.num}
            </div>
            <h3 className="font-serif text-[28px] leading-[1.05] tracking-[-0.02em] text-foreground mb-4">
              {p.title}
            </h3>
            <p className="text-sm leading-[1.6] text-muted-foreground flex-1">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
