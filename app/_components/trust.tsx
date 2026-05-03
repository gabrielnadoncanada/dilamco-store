import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";

const STATS: Array<[string, string]> = [
  ["20+", "Années d'opération continue à Montréal"],
  ["217", "Modules standards au catalogue, sur mesure réel"],
  ["48h", "Délai garanti pour une soumission ferme"],
  ["10 ans", "Garantie complète sur les caissons et la quincaillerie"],
];

export function Trust() {
  return (
    <section className="bg-primary text-background px-[clamp(20px,4vw,56px)] py-[clamp(80px,10vw,130px)] max-[700px]:py-14">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-20">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground/70">
            La structure derrière le produit
          </span>
          <h2 className="font-serif text-[clamp(38px,5vw,64px)] max-[700px]:!text-[36px] tracking-[-0.02em] leading-[1.04] mt-3">
            Le marketing reflète la réalité opérationnelle. Pas l&apos;inverse.
          </h2>
          <p className="mt-6 text-base leading-[1.65] opacity-85 max-w-[480px]">
            Si la qualité n&apos;est pas réelle, le positionnement premium s&apos;effondre. Notre modèle repose sur quatre actifs concrets — pas sur une promesse.
          </p>
          <Button asChild variant="paper" className="mt-8">
            <Link href="/savoir-faire">Visiter l&apos;entrepôt <ButtonArrow /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/15 border border-white/15">
          {STATS.map(([num, lbl]) => (
            <div key={num} className="bg-primary p-8 max-[700px]:p-[22px]">
              <div className="font-serif text-[64px] leading-none tracking-[-0.02em] text-highlight max-[700px]:text-[44px]">
                {num}
              </div>
              <div className="text-[13px] opacity-85 mt-3 leading-[1.5]">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
