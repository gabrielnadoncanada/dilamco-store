import { Eyebrow, Headline } from "@/components/ds";

const CAPTIONS = [
  "Cuisine complète, Outremont",
  "Détail moulure Shaker",
  "Atelier — vérification finition",
];

export function ProductInSitu({ photos }: { photos: string[] }) {
  return (
    <section className="mt-[90px] border-t border-border pt-14">
      <div className="mb-8">
        <Eyebrow>En situation</Eyebrow>
        <Headline
          level="subhead"
          as="h2"
          className="mt-3 text-[clamp(28px,3.5vw,44px)]"
        >
          Le module, hors-catalogue.
        </Headline>
      </div>
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 max-[900px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-3">
        {photos.map((src, i) => (
          <figure key={i} className={i === 0 ? "m-0 max-[900px]:col-span-2 max-[700px]:col-auto" : "m-0"}>
            <div
              className="aspect-[4/5] bg-secondary bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
            <figcaption className="mt-3 flex items-baseline gap-3 text-xs text-muted-foreground">
              <span className="font-mono text-[10px] tracking-[0.08em] text-primary">
                FIG.{String(i + 1).padStart(2, "0")}
              </span>
              <span>{CAPTIONS[i]}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
