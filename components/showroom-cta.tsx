import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";
import { SplitMediaCta } from "@/components/ds";
import { routes } from "@/lib/routes";

export function ShowroomCta() {
  return (
    <SplitMediaCta
      imageSrc="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80"
      eyebrow="Showroom Montréal"
      headline={
        <>
          Voir, toucher,
          <br />
          ouvrir, fermer.
        </>
      }
      body="5 200 pi² d'exposition au cœur du Mile-Ex. Trois cuisines complètes en démonstration, échantillons de tous les finis, tablette de mesure d'angle pour planifier votre projet en 90 minutes."
    >
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
        <Link href={routes.quote}>
          Prendre rendez-vous <ButtonArrow />
        </Link>
      </Button>
    </SplitMediaCta>
  );
}
