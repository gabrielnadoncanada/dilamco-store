"use client";

import Image from "next/image";
import Link from "next/link";
import { Store, Truck, Warehouse } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Headline, Body } from "@/components/ds";
import { photoForProduct } from "@/lib/photos";
import { ProductSpecs } from "./product-specs";
import {
  finishSibling,
  isDoorPanel,
  isFlatPart,
  widthSiblings,
} from "@/lib/products";
import { routes } from "@/lib/routes";
import type { ColorName, Molding, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

/** Prix dominant de la fiche — même structure interne que les cartes (PriceTag). */
function ProductPrice({ amount }: { amount: number }) {
  const [int, rest] = formatPrice(amount).split(",");
  return (
    <span className="mt-3 font-mono text-foreground group-data-[show-prices=false]/body:hidden">
      <span className="text-[32px] font-semibold leading-none tracking-[-0.01em] max-[700px]:text-[26px]">
        {int}
      </span>
      <span className="text-[15px] font-medium max-[700px]:text-[13px]">
        ,{rest}
      </span>
    </span>
  );
}

/** En-tête de section du panneau d'achat : label medium + valeur en sourdine. */
function SectionLabel({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-[13px] font-medium tracking-[0.01em] text-foreground">
        {label}
      </span>
      {value && (
        <span className="text-[13px] text-muted-foreground">— {value}</span>
      )}
    </div>
  );
}

const COLOR_DESC: Record<ColorName, string> = {
  "Blanc Pur": "Blanc opaque, finition mate. La référence neutre du catalogue.",
  "Chêne blanc": "Placage bouleau teinté chêne, veinage horizontal apparent.",
  "Bleu marin":
    "Bleu profond mat, finition catalysée. Pour les îlots et coins repas.",
};

/** Porte à cadre shaker : caissons en finition peinte seulement (les -muf sont en slab). */
function hasShakerlDoor(p: Product): boolean {
  return !isFlatPart(p) && !isDoorPanel(p) && !p.code.endsWith("-muf");
}

function productDescription(p: Product): string {
  if (isDoorPanel(p)) {
    return (
      "Porte de remplacement assortie au fini et au profil des caissons de la " +
      "collection. Idéale pour remplacer une porte abîmée ou habiller un module " +
      "modifié. Charnières vendues séparément."
    );
  }
  if (isFlatPart(p)) {
    return (
      "Pièce de finition assortie aux caissons de la collection : même matériau " +
      "et même fini que vos modules. Se coupe et s'ajuste sur place pour un " +
      "résultat intégré, sans raccord visible."
    );
  }
  if (p.code.endsWith("-muf")) {
    return (
      "Caisson en contreplaqué, finition intérieure en placage de bouleau. " +
      "Porte et façades en mélamine chêne blanc, profil plat (slab). " +
      "Quincaillerie Blum à fermeture amortie."
    );
  }
  return (
    "Caisson en contreplaqué, finition intérieure en placage de bouleau. " +
    "Porte HDF avec moulure massive en bouleau. Quincaillerie Blum à " +
    "fermeture amortie. Fini extérieur catalysé, assorti à la couleur " +
    "sélectionnée."
  );
}

interface Props {
  product: Product;
  molding: Molding;
  setMolding: (m: Molding) => void;
  qty: number;
  setQty: (fn: (q: number) => number) => void;
  onAdd: () => void;
}

export function ProductInfo({
  product,
  molding,
  setMolding,
  qty,
  setQty,
  onAdd,
}: Props) {
  return (
    <div className="flex flex-col gap-7 pt-2 max-[700px]:gap-5">
      {/* Hiérarchie : une seule dominante — le prix. Le titre reste serif
          mais plus discret ; l'eyebrow et le SKU sont tertiaires. */}
      <div className="flex flex-col">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {product.family} · {product.ceiling || "Plafond standard"}
        </span>
        <Headline
          level="headline2"
          as="h1"
          className="mt-2 !text-[26px] !leading-[1.2] text-foreground/90 max-[700px]:!text-[20px]"
        >
          {product.name}
        </Headline>
        <ProductPrice amount={product.price} />
      </div>

      <FinishSelector product={product} />

      <WidthSelector product={product} />

      {hasShakerlDoor(product) && (
        <div className="flex flex-col gap-3">
          <SectionLabel label="Moulure de porte" value={`Shaker ${molding}`} />
          <div
            className={cn(
              "grid gap-2",
              product.moldings.length === 1 ? "grid-cols-1" : "grid-cols-2",
            )}
          >
            {product.moldings.map((m) => (
              <button
                key={m}
                className={cn(
                  "flex cursor-pointer flex-col items-start gap-1 border border-border-strong bg-card px-4 py-3.5 text-left transition-colors hover:border-foreground",
                  molding === m && "border-primary bg-secondary",
                )}
                onClick={() => setMolding(m)}
              >
                <strong className="font-serif text-base font-normal text-foreground">
                  Shaker {m}
                </strong>
                <span className="text-[11px] leading-[1.4] text-muted-foreground">
                  {m === "1 po"
                    ? "Profil épuré, contemporain"
                    : "Profil large, classique éditorial"}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <HowToGetIt />

      <div className="flex items-stretch gap-3 pt-2 max-[700px]:sticky max-[700px]:bottom-0 max-[700px]:z-10 max-[700px]:-mx-[18px] max-[700px]:border-t max-[700px]:border-border max-[700px]:bg-background max-[700px]:px-[18px] max-[700px]:py-3.5">
        <div className="inline-flex items-center border border-border-strong bg-card">
          <button
            className="h-full w-11 cursor-pointer bg-transparent text-lg text-foreground hover:bg-secondary"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <input
            name="quantite"
            aria-label="Quantité"
            className="h-full w-11 border-x border-border bg-transparent text-center font-mono text-sm text-foreground outline-none"
            value={qty}
            onChange={(e) => {
              const next = Math.max(1, parseInt(e.target.value, 10) || 1);
              setQty(() => next);
            }}
          />
          <button
            className="h-full w-11 cursor-pointer bg-transparent text-lg text-foreground hover:bg-secondary"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>
        <Button className="flex-1 text-[13px] font-semibold" onClick={onAdd}>
          Ajouter au projet — {formatPrice(product.price * qty)} <ButtonArrow />
        </Button>
      </div>
    </div>
  );
}

/**
 * Contenu informatif de la fiche (description + accordéons) — affiché sous la
 * galerie, colonne de gauche : la colonne d'achat reste courte et focalisée
 * (pattern IKEA).
 */
export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-5 border-t border-border pt-7">
      <Body
        size="default"
        tone="soft"
        className="max-w-[560px] leading-[1.65] max-[700px]:text-sm"
      >
        {productDescription(product)}
      </Body>
      <div className="-mt-2.5 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
        SKU · {product.id}
        {product.corner && product.corner !== "Non"
          ? " · Configuration " + product.corner.toLowerCase()
          : ""}
      </div>
      <ProductReassurance product={product} />
    </div>
  );
}

/** Specs + réassurance — mêmes engagements que la home/le footer. */
function ProductReassurance({ product }: { product: Product }) {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      <AccordionItem value="specs" className="border-border">
        <AccordionTrigger className="py-4 text-[14px] font-medium tracking-[0.01em] hover:no-underline">
          Spécifications techniques
        </AccordionTrigger>
        <AccordionContent>
          <ProductSpecs product={product} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="livraison" className="border-border">
        <AccordionTrigger className="py-4 text-[14px] font-medium tracking-[0.01em] hover:no-underline">
          Livraison et délais
        </AccordionTrigger>
        <AccordionContent className="text-xs leading-[1.6] text-soft-foreground">
          Modules en stock dans notre entrepôt de Montréal. Soumission ferme
          sous 48 h, incluant livraison et installation si désirée. Pose en 1 à
          3 jours par notre équipe.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="garantie" className="border-border">
        <AccordionTrigger className="py-4 text-[14px] font-medium tracking-[0.01em] hover:no-underline">
          Garantie 10 ans
        </AccordionTrigger>
        <AccordionContent className="text-xs leading-[1.6] text-soft-foreground">
          Caisson et quincaillerie garantis 10 ans. Charnières et coulisses Blum
          à fermeture amortie. Un seul chef de projet pour tout suivi après
          l&apos;installation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="questions" className="border-border">
        <AccordionTrigger className="py-4 text-[14px] font-medium tracking-[0.01em] hover:no-underline">
          Une question avant de commander&nbsp;?
        </AccordionTrigger>
        <AccordionContent className="text-xs leading-[1.6] text-soft-foreground">
          Appelez-nous au{" "}
          <a className="text-primary underline" href="tel:+15142225300">
            514-222-5300
          </a>{" "}
          ou écrivez à{" "}
          <a className="text-primary underline" href="mailto:ventes@dilamco.ca">
            ventes@dilamco.ca
          </a>
          . Salle de montre au 275 rue Beaubien Ouest — voyez et touchez les
          modules avant de décider.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

/**
 * Finitions = SKU distincts (F9-B12 blanc / F9-B12-muf chêne), présentés en
 * vignettes du produit rendu (pattern IKEA « Choose front ») : on voit le
 * caisson changer, pas juste un nom de couleur.
 */
function FinishSelector({ product }: { product: Product }) {
  const sibling = finishSibling(product);
  const current = product.colors[0] || "Blanc Pur";
  const variants = [
    { p: product, color: current, active: true },
    ...(sibling
      ? [
          {
            p: sibling,
            color: sibling.colors[0] || "Chêne blanc",
            active: false,
          },
        ]
      : []),
  ].sort(
    (a, b) =>
      (a.color === "Blanc Pur" ? -1 : 1) - (b.color === "Blanc Pur" ? -1 : 1),
  );

  return (
    <div className="flex flex-col gap-3">
      <SectionLabel label="Finition" value={current} />
      <div className="flex flex-wrap gap-2.5">
        {variants.map(({ p, color, active }) => {
          const tile = (
            <>
              <span className="relative block size-[86px] overflow-hidden bg-secondary max-[700px]:size-[72px]">
                <Image
                  src={photoForProduct(p, color as ColorName)}
                  alt={color}
                  fill
                  sizes="86px"
                  className="object-cover"
                />
              </span>
              <span className="block px-1.5 pb-1.5 pt-1 text-center">
                <span className="block text-[12px] leading-[1.3] text-foreground">
                  {color}
                </span>
                <span className="block font-mono text-[11px] text-soft-foreground group-data-[show-prices=false]/body:hidden">
                  {formatPrice(p.price)}
                </span>
              </span>
            </>
          );
          return active ? (
            <span
              key={p.code}
              aria-current="true"
              className="block border-2 border-foreground bg-card"
            >
              {tile}
            </span>
          ) : (
            <Link
              key={p.code}
              href={routes.product(p.id)}
              className="block border border-border-strong bg-card no-underline transition-colors hover:border-foreground"
            >
              {tile}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Largeurs sœurs avec prix RELATIFS (pattern IKEA « Choose size ») : l'écart
 * par rapport à la sélection se compare d'un coup d'œil.
 */
function WidthSelector({ product }: { product: Product }) {
  const siblings = widthSiblings(product);
  if (siblings.length < 2) return null;
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel label="Largeur" value={`${product.w} po`} />
      <div className="flex flex-wrap gap-2">
        {siblings.map((s) => {
          const delta = s.price - product.price;
          const deltaLabel =
            delta === 0
              ? "même prix"
              : `${delta > 0 ? "+" : "−"}${formatPrice(Math.abs(delta))}`;
          return s.code === product.code ? (
            <span
              key={s.code}
              aria-current="true"
              className="flex flex-col items-center gap-0.5 border-2 border-foreground bg-secondary px-4 py-2 text-center"
            >
              <span className="font-mono text-[13px] font-semibold text-foreground">
                {s.w} po
              </span>
              <span className="text-[10px] text-muted-foreground">
                sélectionné
              </span>
            </span>
          ) : (
            <Link
              key={s.code}
              href={routes.product(s.id)}
              className="flex flex-col items-center gap-0.5 border border-border-strong bg-card px-4 py-2 text-center no-underline transition-colors hover:border-foreground"
            >
              <span className="font-mono text-[13px] text-soft-foreground">
                {s.w} po
              </span>
              <span className="font-mono text-[11px] text-muted-foreground group-data-[show-prices=false]/body:hidden">
                {deltaLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/** « Comment l'obtenir » — canaux concrets avec pastilles (pattern IKEA). */
function HowToGetIt() {
  return (
    <div className="flex flex-col gap-0 border border-border">
      <div className="flex items-start gap-3 border-b border-border px-4 py-3.5">
        <Truck className="mt-0.5 size-[18px] shrink-0 text-foreground" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-medium text-foreground">
            Livraison au Québec
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-soft-foreground">
            <span
              aria-hidden
              className="size-[7px] rounded-full bg-[#3f7a4e]"
            />
            Disponible — chiffrée à la soumission
          </span>
        </div>
      </div>
      <div className="flex items-start gap-3 border-b border-border px-4 py-3.5">
        <Warehouse className="mt-0.5 size-[18px] shrink-0 text-foreground" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-medium text-foreground">
            Cueillette — entrepôt à Montréal
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-soft-foreground">
            <span
              aria-hidden
              className="size-[7px] rounded-full bg-[#3f7a4e]"
            />
            En stock
          </span>
        </div>
      </div>
      <div className="flex items-start gap-3 px-4 py-3.5">
        <Store className="mt-0.5 size-[18px] shrink-0 text-foreground" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-medium text-foreground">
            Salle de montre — 275 rue Beaubien O.
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-soft-foreground">
            <span
              aria-hidden
              className="size-[7px] rounded-full bg-[#3f7a4e]"
            />
            Lun – ven · 9 h à 17 h
          </span>
        </div>
      </div>
    </div>
  );
}
