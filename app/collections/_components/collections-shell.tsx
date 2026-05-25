import { Container } from "@/components/ds";
import { CategorySidebar } from "@/components/category-sidebar";
import type { ReactNode } from "react";

interface Props {
  activeSlug?: string;
  children: ReactNode;
}

export function CollectionsShell({ activeSlug, children }: Props) {
  return (
    <Container
      padded
      className="grid grid-cols-[240px_1fr] gap-y-10 pb-[120px] pt-14 [column-gap:56px] max-[1100px]:grid-cols-1 max-[700px]:gap-y-6 max-[700px]:pb-[60px] max-[700px]:pt-7"
    >
      <aside className="sticky top-[120px] flex max-h-[calc(100vh-140px)] flex-col gap-8 self-start overflow-y-auto pr-2 text-[13px] max-[1100px]:static max-[1100px]:max-h-none max-[1100px]:overflow-visible">
        <CategorySidebar activeSlug={activeSlug} />
      </aside>
      <div className="flex min-w-0 flex-col">{children}</div>
    </Container>
  );
}
