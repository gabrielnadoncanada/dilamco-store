import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";
import { CatCard } from "./cat-card";

const CAT_IMG_MURALE =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80";
const CAT_IMG_BAS =
  "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=900&q=80";
const CAT_IMG_PANTRY =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80";
const CAT_IMG_COIN =
  "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=900&q=80";

export function Categories() {
  return (
    <section className="px-[clamp(20px,4vw,56px)] py-[clamp(80px,10vw,130px)] max-[700px]:py-14 bg-secondary border-b border-border">
      <div className="mx-auto mb-16 flex max-w-[1440px] flex-wrap items-end justify-between gap-10 max-[700px]:mb-8 max-[700px]:gap-[18px]">
        <div>
          <span className="text-[11px] tracking-[0.18em] uppercase font-medium text-primary">
            Le catalogue
          </span>
          <h2 className="font-serif text-[clamp(34px,4.5vw,62px)] tracking-[-0.02em] leading-[1.02] mt-3">
            Parcourez nos armoires par catégorie.
          </h2>
        </div>
        <Button asChild variant="ghost">
          <Link href="/catalogue">
            Tout parcourir <ButtonArrow />
          </Link>
        </Button>
      </div>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 max-[900px]:grid-cols-2 max-[700px]:gap-3.5 min-[901px]:grid-cols-[1.4fr_1fr_1fr]">
        <CatCard
          featured
          img={CAT_IMG_MURALE}
          count={210}
          title="Armoires murales"
          href="/catalogue?famille=Armoire+murale"
        />
        <CatCard
          img={CAT_IMG_BAS}
          count={70}
          title="Armoires de bas"
          href="/catalogue?famille=Armoire+de+bas"
        />
        <CatCard
          img={CAT_IMG_PANTRY}
          count={138}
          title="Garde-manger"
          href="/catalogue?famille=Garde-manger"
        />
        <CatCard
          img={CAT_IMG_COIN}
          count={277}
          title="Modules de coin"
          href="/catalogue?coin=oui"
        />
        <CatCard
          img={CAT_IMG_MURALE}
          count={36}
          title="Au-dessus du frigo"
          href="/catalogue?famille=Armoire+au-dessus+du+r%C3%A9frig%C3%A9rateur"
        />
      </div>
    </section>
  );
}
