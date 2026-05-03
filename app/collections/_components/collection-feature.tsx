import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Heading } from "@/components/legacy/heading";
import { Section } from "@/components/legacy/section";
import type { Collection } from "./data";
import { cn } from "@/lib/utils";

interface Props {
  collection: Collection;
  reverse: boolean;
}

export function CollectionFeature({ collection: c, reverse }: Props) {
  return (
    <Section className="grid grid-cols-[1.15fr_1fr] items-center gap-20 border-b border-border py-20 max-[1000px]:grid-cols-1 max-[1000px]:gap-12 max-[700px]:gap-7 max-[700px]:py-10">
      <div className={cn("relative aspect-[4/5]", reverse && "order-2 max-[1000px]:order-1")}>
        <div
          className="absolute inset-0 border border-border bg-cover bg-center"
          style={{ backgroundImage: `url(${c.ambient})` }}
        />
        <div
          className="absolute -bottom-7 -right-7 flex size-40 items-end border-4 border-background p-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-[1000px]:-bottom-4 max-[1000px]:-right-4 max-[1000px]:size-[110px] max-[700px]:static max-[700px]:mt-3 max-[700px]:h-auto max-[700px]:w-full max-[700px]:aspect-[4/1]"
          style={{ background: c.swColor }}
        >
          <span className="bg-card/85 px-2 py-1 font-mono text-[11px] tracking-[0.08em] text-foreground">
            {c.code}
          </span>
        </div>
      </div>

      <div className={cn("flex flex-col gap-5", reverse && "order-1 max-[1000px]:order-2")}>
        <span className="font-mono text-[11px] tracking-[0.1em] text-primary">
          {c.code} · COLLECTION
        </span>
        <Heading
          as="h2"
          variant="serif"
          className="text-[clamp(48px,6vw,88px)] leading-[0.98] tracking-[-0.025em] text-foreground"
        >
          {c.nom}
        </Heading>
        <p className="-mt-2 font-serif text-[22px] italic tracking-[-0.01em] text-primary">
          {c.sous}
        </p>
        <p className="text-base leading-[1.65] text-soft-foreground">{c.desc}</p>

        <div className="grid grid-cols-3 gap-4 border-y border-border py-5 max-[700px]:gap-2 [&_span]:mb-1 [&_span]:block [&_span]:font-mono [&_span]:text-[10px] [&_span]:uppercase [&_span]:tracking-[0.1em] [&_span]:text-muted-foreground [&_strong]:text-[13px] [&_strong]:font-medium [&_strong]:leading-[1.3] [&_strong]:text-foreground">
          <div>
            <span>Matière</span>
            <strong>{c.matiere}</strong>
          </div>
          <div>
            <span>Référence</span>
            <strong>{c.rgb}</strong>
          </div>
          <div>
            <span>Veinage</span>
            <strong>{c.veinage}</strong>
          </div>
        </div>

        <p className="text-sm italic leading-[1.6] text-soft-foreground">{c.usage}</p>

        <div className="flex items-baseline gap-4">
          <span className="font-serif text-[64px] leading-none tracking-[-0.03em] text-primary">
            {c.pourcentage}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
            {c.pourcentage_lbl}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/catalogue?couleur=${encodeURIComponent(c.nom)}`}>
              Voir les {c.nom.toLowerCase()} <ButtonArrow />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/soumission">Demander un échantillon</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
