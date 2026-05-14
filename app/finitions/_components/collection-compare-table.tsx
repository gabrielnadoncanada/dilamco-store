import { Eyebrow, Headline } from "@/components/ds";
import { COLLECTIONS, COMPARE_ROWS } from "./data";

export function CollectionCompareTable() {
  return (
    <section className="mt-[100px] border-t border-foreground pt-20">
      <Eyebrow>Comparer</Eyebrow>
      <Headline
        level="subhead"
        as="h2"
        className="mb-12 mt-4 text-[clamp(36px,4.5vw,56px)]"
      >
        Lequel pour votre projet ?
      </Headline>
      <div className="border border-border">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] bg-primary text-primary-foreground max-[800px]:grid-cols-4 [&_span]:px-5 [&_span]:py-[18px] [&_span]:font-serif [&_span]:text-[15px] [&_span]:tracking-[-0.01em] max-[800px]:[&_span]:px-3 max-[800px]:[&_span]:text-[11px]">
          <span></span>
          {COLLECTIONS.map((c) => (
            <span key={c.id}>
              {c.nom}
            </span>
          ))}
        </div>
        {COMPARE_ROWS.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-t border-border even:bg-secondary max-[800px]:grid-cols-4 [&_span]:border-r [&_span]:border-border [&_span]:px-5 [&_span]:py-4 [&_span]:text-[13px] [&_span]:text-soft-foreground [&_span:last-child]:border-r-0 max-[800px]:[&_span]:px-3 max-[800px]:[&_span]:text-[11px]"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] !text-foreground">
              {row[0]}
            </span>
            <span>{row[1]}</span>
            <span>{row[2]}</span>
            <span>{row[3]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
