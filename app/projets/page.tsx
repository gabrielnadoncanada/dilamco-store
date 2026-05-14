"use client";

import { useState } from "react";
import { Container, Eyebrow, Headline, Body } from "@/components/ds";
import { PROJECTS } from "./_components/data";
import { ProjetTabs } from "./_components/projet-tabs";
import { ProjetCase } from "./_components/projet-case";
import { ProjetArchive } from "./_components/projet-archive";

export default function ProjetsPage() {
  const [active, setActive] = useState(PROJECTS[0].id);
  const project = PROJECTS.find((p) => p.id === active)!;

  return (
    <Container padded className="pb-[120px] max-[700px]:pb-[60px]">
      <header className="border-b border-border py-[60px] max-[700px]:py-8">
        <Eyebrow>Projets réalisés</Eyebrow>
        <Headline level="hero" as="h1" className="mt-4">
          Du dessin
          <br />
          <em>à la livraison.</em>
        </Headline>
        <Body size="lead" tone="soft" className="mt-7 max-w-[720px]">
          Trois études de cas, du triplex centenaire au penthouse contemporain.
          Mêmes modules au catalogue, mêmes 48h pour la soumission, des budgets
          de 42k à 78k.
        </Body>
      </header>

      <ProjetTabs projects={PROJECTS} active={active} onSelect={setActive} />
      <ProjetCase project={project} />
      <ProjetArchive />
    </Container>
  );
}
