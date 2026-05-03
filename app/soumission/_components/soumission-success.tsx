"use client";

import { useCart } from "@/components/cart-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/legacy/eyebrow";
import { Heading } from "@/components/legacy/heading";

export function SoumissionSuccess({ tel }: { tel: string }) {
  const cart = useCart();
  return (
    <div className="mx-auto my-20 max-w-[720px] px-6 text-center">
      <Eyebrow accent>Demande reçue</Eyebrow>
      <Heading
        as="h1"
        variant="serif"
        className="mt-4 text-[56px] leading-[1.05] tracking-[-0.02em]"
      >
        Votre soumission est en préparation.
      </Heading>
      <p className="mt-6 text-[17px] leading-[1.6] text-muted-foreground">
        Un chef de projet Dilamco vous rappelle au {tel || "numéro fourni"} dans les 24
        prochaines heures pour valider les dimensions. Vous recevrez votre soumission
        ferme par courriel sous 48h.
      </p>
      <div className="mt-10">
        <Button asChild onClick={() => cart.clear()}>
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </div>
  );
}
