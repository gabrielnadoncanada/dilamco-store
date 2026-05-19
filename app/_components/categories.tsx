import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";
import {
  Section,
  Container,
  SectionHeading,
} from "@/components/ds";
import { CatCard } from "./cat-card";
import { collectionsFilter, routes } from "@/lib/routes";

const CAT_IMG_MURALE = "/assets/cat_wall.png";
const CAT_IMG_BAS = "/assets/cat_base.png";
const CAT_IMG_PANTRY = "/assets/cat_kitchen.png";
const CAT_IMG_COIN = "/assets/cat_base_corner.png";
const CAT_IMG_FRIDGE = "/assets/cat_above_fridge.png";

export function Categories() {
  return (
    <Section surface="secondary">
      <Container>
        <div className="mb-16 max-[700px]:mb-8 flex flex-wrap items-end justify-between gap-10 max-[700px]:gap-[18px]">
          <SectionHeading
            eyebrow="Les collections"
            title="Parcourez nos armoires par catégorie."
          />
          <Button asChild variant="ghost">
            <Link href={routes.collections}>
              Tout parcourir <ButtonArrow />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 max-[900px]:grid-cols-2 max-[700px]:gap-3.5 min-[901px]:grid-cols-[1.4fr_1fr_1fr]">
          <CatCard
            featured
            img={CAT_IMG_MURALE}
            count={210}
            title="Armoires murales"
            href={collectionsFilter.family("Armoire murale")}
          />
          <CatCard
            img={CAT_IMG_BAS}
            count={70}
            title="Armoires de bas"
            href={collectionsFilter.family("Armoire de bas")}
          />
          <CatCard
            img={CAT_IMG_PANTRY}
            count={138}
            title="Garde-manger"
            href={collectionsFilter.family("Garde-manger")}
          />
          <CatCard
            img={CAT_IMG_COIN}
            count={277}
            title="Modules de coin"
            href={collectionsFilter.corner}
          />
          <CatCard
            img={CAT_IMG_FRIDGE}
            count={36}
            title="Au-dessus du frigo"
            href={collectionsFilter.family("Armoire au-dessus du réfrigérateur")}
          />
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild>
            <Link href={routes.quote}>Demander une soumission</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
