import { Suspense } from "react";
import CollectionsClient from "./collections-client";

export const metadata = {
  title: "Collections · Dilamco",
};

export default function CollectionsPage() {
  return (
    <Suspense fallback={null}>
      <CollectionsClient />
    </Suspense>
  );
}
