import Link from "next/link";
import { MediaTabs } from "@/components/ds/media-tabs";
import { routes } from "@/lib/routes";

export default function Packages() {
  return (
    <MediaTabs
      eyebrow="Forfaits clé en main"
      title="Une cuisine complète, prix tout inclus."
      description="Modules, panneaux, fillers, livraison et installation — un seul prix, ferme et garanti."
      items={[
        {
          id: "10x10",
          label: "10×10",
          imageSrc: "/assets/cat_kitchen.png",
          badge: "Forfait Scandinave · Chêne blanc",
          callout: (
            <strong className="text-2xl">
              12 998 $<sup>*</sup>
            </strong>
          ),
          footerText:
            "* Prix incluant 22 modules, 3 panneaux de finition, fillers, livraison à Montréal et installation. Comptoir vendu séparément.",
          actions: (
            <>
              <Link href={routes.quote}>Obtenir ce forfait →</Link>
              <Link href={routes.collections}>Voir les modules</Link>
            </>
          ),
        },
        // 12×12, L-Shape, Avec îlot...
      ]}
    />
  );
}
