import { Eyebrow } from "@/components/legacy/eyebrow";
import { Heading } from "@/components/legacy/heading";

export function SfHero() {
  return (
    <header className="my-14 grid grid-cols-[0.9fr_1.1fr] items-end gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[700px]:my-6 max-[700px]:gap-0">
      <div className="pb-10 max-[900px]:pb-0">
        <Eyebrow accent>Savoir-faire</Eyebrow>
        <Heading
          as="h1"
          variant="serif"
          className="mt-4 text-[clamp(48px,6.5vw,92px)] leading-[0.98] tracking-[-0.025em] text-foreground [&_em]:italic [&_em]:text-primary"
        >
          Une chaîne courte,<br />
          contrôlée,<br />
          <em>depuis vingt ans</em>.
        </Heading>
        <p className="mt-7 max-w-[480px] text-[17px] leading-[1.6] text-soft-foreground">
          Le marketing ne précède pas la réalité opérationnelle. Voici ce qui sépare nos
          modules de ce que vous trouverez ailleurs — concrètement, structurellement.
        </p>
      </div>
      <div
        className="relative min-h-[560px] border border-border bg-secondary bg-cover bg-center max-[700px]:min-h-[320px]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80)",
        }}
      >
        <span className="absolute bottom-5 left-5 bg-background px-3.5 py-2 font-mono text-[11px] tracking-[0.08em] text-foreground">
          Entrepôt Dilamco · Montréal · 3 200 m²
        </span>
      </div>
    </header>
  );
}
