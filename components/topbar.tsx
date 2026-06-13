"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { useCart } from "./cart-provider";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  categoryName,
  getTopLevelCategories,
} from "@/lib/catalog-categories";
import { hasVisibleProducts, productsInCategory } from "@/lib/products";
import { pathPrefixes, routes } from "@/lib/routes";

const LINKS: Array<[string, string]> = [
  [routes.collections, "Collections"],
  [routes.finishes, "Finitions"],
  [routes.quote, "Demander une soumission"],
];

/** Catégories principales du menu mobile : accès direct au catalogue. */
const MENU_CATEGORIES = getTopLevelCategories()
  .filter((c) => hasVisibleProducts(c.slug))
  .map((c) => ({
    href: routes.collection(c.slug),
    label: categoryName(c),
    count: productsInCategory(c.slug, { deep: true }).length,
  }));

export function Topbar() {
  const pathname = usePathname();
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    pathname === path ||
    (path === routes.collections && pathname.startsWith(pathPrefixes.product));

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur-md">
      <div className="relative bg-primary text-primary-foreground py-1.5 md:py-2 px-[clamp(16px,4vw,56px)]">
        <Link
          href={routes.quote}
          className="block text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-center font-medium max-[380px]:text-[9px] hover:underline underline-offset-[3px]"
        >
          Entrepôt à Montréal · 20+ ans d'expérience · Soumission en ligne
        </Link>
        <a
          href="tel:+15142225300"
          className="absolute right-[clamp(16px,4vw,56px)] top-1/2 hidden -translate-y-1/2 font-mono text-[11px] tracking-[0.06em] hover:underline md:block"
        >
          514-222-5300
        </a>
      </div>
      <div className="flex items-center gap-3 md:gap-6 px-[18px] px-6 py-3.5 md:py-[22px] ">
        <Link
          href={routes.home}
          aria-label="Dilamco accueil"
          className="inline-flex items-center justify-center"
        >
          <Logo className="h-[18px] md:h-[22px]" />
        </Link>
        <nav className="ml-auto hidden md:flex gap-8 items-center text-[13px] tracking-[0.04em]">
          {LINKS.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`relative py-1 hover:text-primary ${
                isActive(href)
                  ? "text-primary after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-primary"
                  : "text-soft-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3 md:gap-6 justify-end items-center text-[13px] tracking-[0.04em] max-md:ml-auto">
          <button
            className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 bg-primary text-primary-foreground px-3 md:px-4 py-2 md:py-[9px] rounded-full text-[11px] md:text-xs tracking-[0.06em] cursor-pointer border-0"
            onClick={() => cart.setDrawerOpen(true)}
          >
            <span className="hidden md:inline">Mon projet</span>
            <span className="inline md:hidden max-[380px]:hidden">Projet</span>
            <span className="bg-background text-primary rounded-full px-[7px] py-px text-[11px] font-semibold min-w-[18px] text-center">
              {cart.totalQty}
            </span>
          </button>
        </div>

        <Drawer direction="bottom" open={menuOpen} onOpenChange={setMenuOpen}>
          <DrawerTrigger asChild>
            <button
              className="flex md:hidden w-10 h-10 flex-col justify-center items-center gap-[5px] bg-transparent border-0 cursor-pointer p-0 -ml-2"
              aria-label="Menu"
            >
              <span className="block w-[22px] h-[1.5px] bg-foreground rounded-sm"></span>
              <span className="block w-[22px] h-[1.5px] bg-foreground rounded-sm"></span>
              <span className="block w-[22px] h-[1.5px] bg-foreground rounded-sm"></span>
            </button>
          </DrawerTrigger>
          <DrawerContent
            className="bg-background p-0"
            aria-describedby={undefined}
          >
            <DrawerTitle className="sr-only">Menu</DrawerTitle>
            <nav className="overflow-y-auto px-5 pb-4 pt-2">
              <span className="block px-1 pb-1.5 pt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Catalogue
              </span>
              {MENU_CATEGORIES.map(({ href, label, count }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-baseline justify-between gap-3 border-b border-border px-1 py-3 font-serif text-[19px] tracking-[-0.01em] ${
                    pathname.startsWith(href) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {label}
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {count}
                  </span>
                </Link>
              ))}
              <Link
                href={routes.collections}
                className="flex items-center justify-between gap-3 border-b border-border px-1 py-3 text-[13px] tracking-[0.04em] text-soft-foreground"
              >
                Toutes les collections
                <span className="font-mono text-sm opacity-40">→</span>
              </Link>
              <Link
                href={routes.finishes}
                className={`flex items-center justify-between gap-3 border-b border-border px-1 py-3 text-[13px] tracking-[0.04em] ${
                  isActive(routes.finishes) ? "text-primary" : "text-soft-foreground"
                }`}
              >
                Finitions
                <span className="font-mono text-sm opacity-40">→</span>
              </Link>
              <Link
                href={routes.quote}
                className={`flex items-center justify-between gap-3 px-1 py-3 text-[13px] tracking-[0.04em] ${
                  isActive(routes.quote) ? "text-primary" : "text-soft-foreground"
                }`}
              >
                Demander une soumission
                <span className="font-mono text-sm opacity-40">→</span>
              </Link>
            </nav>
            <div className="flex items-baseline justify-between gap-3 border-t border-border px-6 py-4 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              <span>Showroom · 275 Beaubien O</span>
              <a href="tel:5142225300" className="text-primary">
                514 222 5300
              </a>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
