export function SfQuoteBlock() {
  return (
    <section className="my-[90px] bg-primary px-10 py-20 text-center text-primary-foreground">
      <p className="font-serif text-[72px] leading-none text-highlight">“</p>
      <p className="mx-auto max-w-[1000px] font-serif text-[clamp(28px,4vw,52px)] leading-[1.15] tracking-[-0.025em] [&_em]:italic [&_em]:text-highlight">
        Nous ne vendons pas une marque ; nous vendons<br />
        <em>une logistique maîtrisée</em>, dont l&apos;avantage se mesure<br />
        en jours de chantier économisés.
      </p>
      <div className="mt-8">
        <strong className="font-serif text-lg font-normal">Antoine Dilamco</strong>
        <br />
        <span className="font-mono text-[11px] tracking-[0.08em] opacity-70">
          Fondateur · 2003
        </span>
      </div>
    </section>
  );
}
