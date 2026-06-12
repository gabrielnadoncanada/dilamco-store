import { Container } from "@/components/ds";
import { CategorySidebar } from "@/components/category-sidebar";
import { MobileFiltersDrawer } from "./mobile-filters-drawer";
import type { ReactNode } from "react";

import type { CatalogScope } from "./filtering";

interface Props {
  activeSlug?: string;
  /** Portée produits de la page (catégorie/sous-catégorie) pour les facettes mobiles. */
  scope?: CatalogScope;
  /** Facettes (SidebarFilters) affichées sous la navigation de catégories. */
  filters?: ReactNode;
  children: ReactNode;
}

export function CollectionsShell({ activeSlug, scope, filters, children }: Props) {
  return (
    <Container
      padded
      className="grid grid-cols-[240px_1fr] gap-y-6 pb-[120px] pt-14 [column-gap:56px] max-[1100px]:grid-cols-1 max-[700px]:gap-y-4 max-[700px]:pb-[60px] max-[700px]:pt-7"
    >
      {/* Desktop : colonne de facettes fixe (groupes repliés façon IKEA). */}
      <aside className="sticky top-[120px] flex max-h-[calc(100vh-140px)] flex-col self-start overflow-y-auto pr-2 text-[13px] max-[1100px]:hidden">
        {filters}
      </aside>
      {/* Mobile/tablette : bottom drawer ouvert par une pastille flottante. */}
      <MobileFiltersDrawer scope={scope} activeSlug={activeSlug} />
      <div className="flex min-w-0 flex-col">{children}</div>
    </Container>
  );
}
