"use client";

import type { Project } from "./data";
import { cn } from "@/lib/utils";

interface Props {
  projects: Project[];
  active: string;
  onSelect: (id: string) => void;
}

export function ProjetTabs({ projects, active, onSelect }: Props) {
  return (
    <nav className="mb-14 grid grid-cols-3 border-b border-border max-[900px]:grid-cols-1">
      {projects.map((p, i) => (
        <button
          key={p.id}
          className={cn(
            "relative cursor-pointer border-r border-border px-6 py-7 text-left transition-colors last:border-r-0 hover:bg-secondary max-[900px]:border-r-0 max-[900px]:border-b",
            active === p.id &&
              "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary",
          )}
          onClick={() => onSelect(p.id)}
        >
          <span className="block font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
            0{i + 1}
          </span>
          <span
            className={cn(
              "mt-2 block font-serif text-[28px] leading-none tracking-[-0.02em] text-foreground",
              active === p.id && "text-primary",
            )}
          >
            {p.ville}
          </span>
          <span className="mt-4 block font-mono text-[11px] tracking-[0.06em] text-muted-foreground">
            {p.surface} · {p.budget}
          </span>
        </button>
      ))}
    </nav>
  );
}
