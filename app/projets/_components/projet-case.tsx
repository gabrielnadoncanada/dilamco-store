import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Eyebrow } from "@/components/legacy/eyebrow";
import { Heading } from "@/components/legacy/heading";
import type { Project } from "./data";

export function ProjetCase({ project }: { project: Project }) {
  return (
    <article key={project.id}>
      <div
        className="relative mb-14 aspect-[16/8] border border-border bg-cover bg-center"
        style={{ backgroundImage: `url(${project.hero})` }}
      >
        <div className="absolute left-6 top-6 flex gap-4 bg-background px-3.5 py-2 text-[11px] tracking-[0.08em]">
          <span className="font-mono text-foreground">CAS · {project.id.toUpperCase()}</span>
          <span className="font-mono text-foreground">{project.annee}</span>
        </div>
      </div>

      <div className="mb-14 grid grid-cols-[1fr_1.3fr] items-start gap-16 border-b border-border pb-14 max-[900px]:grid-cols-1 max-[900px]:gap-6 max-[900px]:pb-8">
        <div>
          <Eyebrow accent>{project.ville}</Eyebrow>
          <Heading
            as="h2"
            variant="serif"
            className="mt-3 text-[clamp(36px,4.5vw,56px)] leading-[1.02] tracking-[-0.025em] text-foreground"
          >
            {project.titre}
          </Heading>
        </div>
        <div className="grid grid-cols-3 gap-6 border-t border-foreground pt-6 max-[700px]:grid-cols-2 max-[700px]:gap-4 [&_span]:mb-1.5 [&_span]:block [&_span]:font-mono [&_span]:text-[10px] [&_span]:uppercase [&_span]:tracking-[0.1em] [&_span]:text-muted-foreground [&_strong]:font-serif [&_strong]:text-lg [&_strong]:font-normal [&_strong]:tracking-[-0.01em] [&_strong]:text-foreground">
          <div>
            <span>Surface</span>
            <strong>{project.surface}</strong>
          </div>
          <div>
            <span>Budget final</span>
            <strong>{project.budget}</strong>
          </div>
          <div>
            <span>Durée chantier</span>
            <strong>{project.duree}</strong>
          </div>
          <div>
            <span>Modules</span>
            <strong>{project.modules}</strong>
          </div>
          <div>
            <span>Fini</span>
            <strong>{project.fini}</strong>
          </div>
          <div>
            <span>Plafond</span>
            <strong>{project.plafond}</strong>
          </div>
        </div>
      </div>

      <div className="mb-14 border border-border bg-secondary px-8 py-14 text-center">
        <p className="mx-auto mb-6 max-w-[900px] font-serif text-[clamp(24px,3vw,36px)] italic leading-[1.3] tracking-[-0.01em] text-foreground">
          « {project.citation} »
        </p>
        <span className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground">
          — {project.auteur} · architecte associé : {project.architecte}
        </span>
      </div>

      <div className="mb-14 grid grid-cols-2 grid-rows-2 gap-4 max-[800px]:grid-cols-1 max-[800px]:grid-rows-none max-[800px]:gap-2.5">
        <div
          className="row-span-2 min-h-[560px] border border-border bg-cover bg-center max-[800px]:row-auto max-[800px]:min-h-0 max-[800px]:aspect-[4/3]"
          style={{ backgroundImage: `url(${project.galerie[0]})` }}
        />
        <div
          className="aspect-[4/3] border border-border bg-cover bg-center"
          style={{ backgroundImage: `url(${project.galerie[1]})` }}
        />
        <div
          className="aspect-[4/3] border border-border bg-cover bg-center"
          style={{ backgroundImage: `url(${project.galerie[2]})` }}
        />
      </div>

      <div className="mb-[100px] flex flex-wrap gap-4 border-t border-border pt-8">
        <Button asChild><Link href="/soumission">Démarrer un projet similaire <ButtonArrow /></Link></Button>
        <Button asChild variant="ghost"><Link href="/catalogue">Voir les modules utilisés</Link></Button>
      </div>
    </article>
  );
}
