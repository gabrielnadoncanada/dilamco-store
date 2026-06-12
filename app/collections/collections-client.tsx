"use client";

import { Eyebrow, Headline, Body } from "@/components/ds";
import { CategorySidebar } from "@/components/category-sidebar";
import { CollectionsShell } from "./_components/collections-shell";
import { ProductGrid } from "./_components/product-grid";
import { SidebarFilters } from "./_components/sidebar-filters";

export default function CollectionsClient() {
  return (
    <CollectionsShell
      filters={
        <SidebarFilters categories={<CategorySidebar />} />
      }
    >
      <header className="border-b border-border pb-7">
        <Eyebrow>Catalogue technique</Eyebrow>
        <Headline level="headline" as="h1" className="mt-2">
          Armoires de cuisine
        </Headline>
        <Body size="default" tone="soft" className="mt-4 max-w-[640px] leading-[1.6]">
          Composez votre cuisine module par module : caissons du bas, armoires
          murales, garde-manger et pièces de finition, offerts en Blanc Pur et
          Chêne blanc. Tous les prix sont affichés — ajoutez vos modules au
          projet et obtenez une soumission ferme sous 48 h.
        </Body>
      </header>
      <ProductGrid groupByFamily />
    </CollectionsShell>
  );
}
