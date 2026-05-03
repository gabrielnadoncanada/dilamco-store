import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";

const HERO_IMG =
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80";

export function Hero() {
  return (
    <section className="relative min-[901px]:min-h-[78vh] grid grid-cols-1 min-[901px]:grid-cols-[1.1fr_1fr] bg-secondary border-b border-border overflow-hidden">
      <div className="px-[clamp(28px,5vw,80px)] py-[clamp(48px,7vw,110px)] max-[700px]:p-[40px_22px] flex flex-col justify-center gap-8 relative z-[2]">
        <h1 className="font-serif text-[clamp(48px,7vw,96px)] max-[700px]:!text-[clamp(36px,9vw,52px)] leading-[0.98] tracking-[-0.025em] text-foreground [&_em]:italic [&_em]:text-primary">
          Armoires de cuisine en stock, <em>abordables et durables.</em>
        </h1>
        <div>
          <p className="max-w-[480px] text-[17px] leading-[1.55] text-soft-foreground">
            Voyez les prix instantanément et montez votre cuisine en ligne.
            Validation rapide par notre équipe avant votre commande.
          </p>
          <ul className="mt-6 flex flex-col gap-2">
            <li className=" text-sm  tracking-[0.06em]">
              — 200+ modules en stock, prêts à être livrés.
            </li>
            <li className="text-sm  tracking-[0.06em]">
              — Armoires en contreplaqué et HDF, qualité inégalée.
            </li>
            <li className="text-sm  tracking-[0.06em]">
              — Livraison rapide depuis Montréal.
            </li>
          </ul>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button asChild>
            <Link href="/catalogue">
              Créer ma cuisine <ButtonArrow />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/soumission">Demander une soumission</Link>
          </Button>
        </div>
      </div>
      <div className="relative bg-primary overflow-hidden max-[900px]:min-h-[320px] max-[700px]:min-h-[280px] before:content-[''] before:absolute before:inset-0 before:[background:radial-gradient(circle_at_30%_20%,rgba(200,184,144,0.18),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_60%)]">
        <div
          className="absolute inset-0 bg-cover bg-center [filter:contrast(0.96)_saturate(0.9)]"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
      </div>
    </section>
  );
}
