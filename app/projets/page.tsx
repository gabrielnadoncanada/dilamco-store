"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/legacy/eyebrow";
import { Heading } from "@/components/legacy/heading";
import { PROJECTS } from "./_components/data";
import { ProjetTabs } from "./_components/projet-tabs";
import { ProjetCase } from "./_components/projet-case";
import { ProjetArchive } from "./_components/projet-archive";

export default function ProjetsPage() {
  const [active, setActive] = useState(PROJECTS[0].id);
  const project = PROJECTS.find((p) => p.id === active)!;

  return (
    <div className="mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pb-[120px] max-[700px]:px-[18px] max-[700px]:pb-[60px]">
      <header className="border-b border-border py-[60px] max-[700px]:py-8">
        <Eyebrow accent>Projets réalisés</Eyebrow>
        <Heading
          as="h1"
          variant="serif"
          className="mt-4 text-[clamp(56px,7vw,110px)] leading-[0.98] tracking-[-0.025em] text-foreground [&_em]:italic [&_em]:text-primary"
        >
          Du dessin<br />
          <em>à la livraison.</em>
        </Heading>
        <p className="mt-7 max-w-[720px] text-[17px] leading-[1.6] text-soft-foreground">
          Trois études de cas — du triplex centenaire au penthouse contemporain. Mêmes
          modules au catalogue, mêmes 48h pour la soumission, des budgets de 42k à 78k.
        </p>
      </header>

      <ProjetTabs projects={PROJECTS} active={active} onSelect={setActive} />
      <ProjetCase project={project} />
      <ProjetArchive />
    </div>
  );
}
