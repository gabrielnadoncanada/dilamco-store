import { Suspense } from "react";
import CatalogueClient from "./catalogue-client";

export const metadata = {
  title: "Catalogue · Dilamco",
};

export default function CataloguePage() {
  return (
    <Suspense fallback={null}>
      <CatalogueClient />
    </Suspense>
  );
}
