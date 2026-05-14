import { Eyebrow } from "@/components/ds";
import { ARCHIVE } from "./data";

export function ProjetArchive() {
  return (
    <section className="border-t border-foreground pt-14">
      <Eyebrow>Archive · 2018 — 2024</Eyebrow>
      <div className="mt-8 grid grid-cols-4 gap-px border border-border bg-border max-[800px]:grid-cols-2">
        {ARCHIVE.map((p, i) => (
          <div
            key={i}
            className="flex cursor-pointer flex-col gap-1.5 bg-background p-6 transition-colors hover:bg-secondary"
          >
            <span className="font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
              0{i + 4}
            </span>
            <strong className="font-serif text-[22px] font-normal tracking-[-0.01em] text-foreground">
              {p.v}
            </strong>
            <span className="font-mono text-[11px] text-muted-foreground">
              {p.m} · {p.b}$
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
