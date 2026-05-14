"use client";

import { useCart } from "@/components/cart-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow, Headline, Body } from "@/components/ds";

export function SoumissionSuccess({ tel }: { tel: string }) {
  const cart = useCart();
  return (
    <div className="mx-auto my-20 max-w-[720px] px-6 text-center">
      <Eyebrow>Demande reçue</Eyebrow>
      <Headline level="headline" as="h1" className="mt-4">
        Votre soumission est en préparation.
      </Headline>
      <Body size="lead" tone="muted" className="mt-6">
        Un chef de projet Dilamco vous rappelle au {tel || "numéro fourni"}{" "}
        dans les 24 prochaines heures pour valider les dimensions. Vous
        recevrez votre soumission ferme par courriel sous 48h.
      </Body>
      <div className="mt-10">
        <Button asChild onClick={() => cart.clear()}>
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </div>
  );
}
