import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Headline, Body, ButtonGroup } from "@/components/ds";
import type { Collection } from "./data";
import { cn } from "@/lib/utils";

interface Props {
  collection: Collection;
  reverse: boolean;
}

export function CollectionFeature({ collection: c, reverse }: Props) {
  return (
    <section className="grid grid-cols-[1.15fr_1fr] items-center gap-20 border-b border-border py-20 max-[1000px]:grid-cols-1 max-[1000px]:gap-12 max-[700px]:gap-7 max-[700px]:py-10">
      <div
        className={cn(
          "relative aspect-[4/5]",
          reverse && "order-2 max-[1000px]:order-1",
        )}
      >
        <div
          className="absolute inset-0 border border-border bg-cover bg-center"
          style={{ backgroundImage: `url(${c.ambient})` }}
        />
      </div>

      <div
        className={cn(
          "flex flex-col gap-5",
          reverse && "order-1 max-[1000px]:order-2",
        )}
      >
        <span className="font-mono text-[11px] tracking-[0.1em] text-primary">
          {c.code} · FINITION
        </span>
        <Headline level="display" as="h2">
          {c.nom}
        </Headline>
        <ul className="-mt-2 list-none space-y-1 font-serif text-[22px] italic tracking-[-0.01em] text-primary">
          {c.taglines.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <Body size="default" tone="soft" className="leading-[1.65]">
          {c.desc}
        </Body>

        <div className="grid grid-cols-3 gap-4 border-y border-border py-5 max-[700px]:gap-2 [&_span]:mb-1 [&_span]:block [&_span]:font-mono [&_span]:text-[10px] [&_span]:uppercase [&_span]:tracking-[0.1em] [&_span]:text-muted-foreground [&_strong]:text-[13px] [&_strong]:font-medium [&_strong]:leading-[1.3] [&_strong]:text-foreground">
          {(
            c.specs ?? [
              { label: "Matière", value: c.matiere },
              { label: "Référence", value: c.rgb },
              { label: "Veinage", value: c.veinage },
            ]
          ).map((row) => (
            <div key={row.label}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </div>
          ))}
        </div>

        {c.usage ? (
          <Body size="sm" tone="soft" className="italic">
            {c.usage}
          </Body>
        ) : null}

        <div className="flex items-baseline gap-4">
          <span className="font-serif text-[64px] leading-none tracking-[-0.03em] text-primary">
            {c.pourcentage}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
            {c.pourcentage_lbl}
          </span>
        </div>

        <ButtonGroup className="mt-3">
          <Button asChild>
            <Link href={`/catalogue?couleur=${encodeURIComponent(c.nom)}`}>
              {c.primaryCta ?? `Voir les ${c.nom.toLowerCase()}`}{" "}
              <ButtonArrow />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={c.secondaryCta?.href ?? "/soumission"}>
              {c.secondaryCta?.label ?? "Demander un échantillon"}
            </Link>
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
}
