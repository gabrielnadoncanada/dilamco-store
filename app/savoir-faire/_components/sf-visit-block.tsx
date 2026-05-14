import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Eyebrow, Headline, Body } from "@/components/ds";

export function SfVisitBlock() {
  return (
    <section>
      <div className="grid grid-cols-[1.1fr_0.9fr] border border-border max-[900px]:grid-cols-1">
        <div
          className="min-h-[560px] bg-cover bg-center max-[700px]:min-h-[320px]"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80)",
          }}
        />
        <div className="flex flex-col justify-center bg-card p-14 max-[700px]:p-7">
          <Eyebrow>Showroom Montréal</Eyebrow>
          <Headline
            level="subhead"
            as="h2"
            className="mt-4 text-[clamp(40px,5vw,64px)] leading-[1] tracking-[-0.02em]"
          >
            Voir, toucher,
            <br />
            ouvrir, fermer.
          </Headline>
          <Body size="sm" tone="soft" className="mt-5 leading-[1.7]">
            5 200 pi² d&apos;exposition au cœur du Mile-Ex. Trois cuisines complètes
            en démonstration, échantillons de tous les finis, tablette de mesure
            d&apos;angle pour planifier votre projet en 90 minutes.
          </Body>
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 max-[700px]:grid-cols-1 max-[700px]:gap-3.5">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                Adresse
              </span>
              <br />
              <strong className="font-serif text-base font-normal text-foreground">
                275 rue Beaubien Ouest, Montréal H2T 1S2
              </strong>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                Sur rendez-vous
              </span>
              <br />
              <strong className="font-serif text-base font-normal text-foreground">
                Lun – Ven · 9h à 17h
              </strong>
            </div>
          </div>
          <Button asChild className="mt-8">
            <Link href="/soumission">
              Prendre rendez-vous <ButtonArrow />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
