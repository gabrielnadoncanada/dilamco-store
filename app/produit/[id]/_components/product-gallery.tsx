"use client";

import "photoswipe/style.css";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ModuleRender } from "@/components/module-render";
import type { ColorName, Molding, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface GalleryView {
  type: "photo" | "svg";
  src?: string;
  label: string;
}

interface Props {
  product: Product;
  color: ColorName;
  molding: Molding;
  views: GalleryView[];
  view: number;
  onSelectView: (i: number) => void;
}

const PSWP_DIMENSION = 1600;

export function ProductGallery({
  product,
  color,
  molding,
  views,
  view,
  onSelectView,
}: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  const galleryID = `pswp-${product.id}`;

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryID}`,
      children: "a[data-pswp]",
      bgOpacity: 0.95,
      wheelToZoom: true,
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    lightboxRef.current = lightbox;
    return () => {
      lightbox.destroy();
      lightboxRef.current = null;
    };
  }, [galleryID]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => onSelectView(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelectView]);

  useEffect(() => {
    if (!api) return;
    if (api.selectedScrollSnap() !== view) {
      api.scrollTo(view);
    }
  }, [api, view]);

  const current = views[view] || views[0];

  return (
    <Fragment>
      <div className="flex items-start gap-4 max-[1000px]:flex-col">
        {/* Vignettes en colonne verticale à DROITE de l'image (l'image reste
            collée au contenu, les vignettes vers la colonne d'achat) ;
            sous l'image, en rangée, sur mobile. */}
        <div className="order-2 flex w-[76px] shrink-0 flex-col gap-3 max-[1000px]:w-full max-[1000px]:flex-row max-[1000px]:flex-wrap">
          {views.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onSelectView(i);
                api?.scrollTo(i);
              }}
              aria-label={`Voir ${v.label}`}
              aria-current={view === i}
              className={cn(
                "relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden border border-border bg-secondary p-[12%] transition-colors hover:border-soft-foreground max-[1000px]:w-[64px] [&>*]:max-h-full [&>*]:max-w-full",
                view === i && "border-2 border-foreground",
              )}
            >
              {v.type === "photo" && v.src ? (
                <Image
                  src={v.src}
                  alt={v.label}
                  fill
                  sizes="76px"
                  className="object-cover"
                />
              ) : (
                <ModuleRender
                  product={product}
                  color={color}
                  molding={molding}
                />
              )}
            </button>
          ))}
        </div>

        <div className="order-1 flex min-w-0 flex-1 flex-col gap-3 max-[1000px]:w-full">
          <div className="group/photos relative">
            <div id={galleryID} className="pswp-gallery">
              <Carousel
                setApi={setApi}
                opts={{ loop: false, align: "start" }}
                className="w-full"
              >
                <CarouselContent className="ml-0">
                  {views.map((v, i) => (
                    <CarouselItem key={i} className="pl-0">
                      <GallerySlide
                        view={v}
                        product={product}
                        color={color}
                        molding={molding}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden opacity-0 transition-opacity duration-200 group-hover/photos:opacity-100 md:block">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </div>

            <div className="pointer-events-none absolute bottom-3.5 right-3.5 z-10 bg-background/90 px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-foreground ring-1 ring-border md:hidden">
              {view + 1} / {views.length}
            </div>
          </div>

          <div className="relative h-[3px] w-full overflow-hidden bg-secondary md:hidden">
            <div
              className="absolute inset-y-0 left-0 bg-foreground transition-transform duration-300"
              style={{
                width: `${100 / views.length}%`,
                transform: `translateX(${view * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function GallerySlide({
  view,
  product,
  color,
  molding,
}: {
  view: GalleryView;
  product: Product;
  color: ColorName;
  molding: Molding;
}) {
  if (view.type === "photo" && view.src) {
    return (
      <a
        href={view.src}
        data-pswp
        data-pswp-width={PSWP_DIMENSION}
        data-pswp-height={PSWP_DIMENSION}
        target="_blank"
        rel="noreferrer"
        aria-label={`Agrandir ${view.label}`}
        className="relative block aspect-square w-full overflow-hidden border border-border bg-secondary cursor-zoom-in max-[700px]:aspect-[4/3]"
      >
        <Image
          src={view.src}
          alt={view.label}
          fill
          sizes="(max-width: 1000px) 100vw, 50vw"
          className="object-contain transition-transform duration-500 hover:scale-[1.02]"
        />
      </a>
    );
  }
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border border-border bg-secondary p-[12%] max-[700px]:aspect-[4/3] [&>*]:max-h-full [&>*]:max-w-full">
      <ModuleRender product={product} color={color} molding={molding} />
    </div>
  );
}
