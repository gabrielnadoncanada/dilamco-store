"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { useCart } from "./cart-provider";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const LINKS: Array<[string, string]> = [
  ["/catalogue", "Catalogue"],
  ["/finitions", "Finitions"],
  ["/soumission", "Demander une soumission"],
];

export function Topbar() {
  const pathname = usePathname();
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    pathname === path ||
    (path === "/catalogue" && pathname.startsWith("/produit"));

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur-md">
      <div className="bg-primary text-primary-foreground text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-center font-medium py-1.5 md:py-2 px-[clamp(16px,4vw,56px)] max-[380px]:text-[9px]">
        Entrepôt à Montréal · 20+ ans d'expérience · Soumission en ligne
      </div>
      <div className="flex items-center gap-3 md:gap-6 px-[18px] px-6 py-3.5 md:py-[22px] ">
        <Link
          href="/"
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

        <Drawer direction="left" open={menuOpen} onOpenChange={setMenuOpen}>
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
            className="bg-background w-[min(360px,88vw)] sm:max-w-none border-r-0 p-0"
            aria-describedby={undefined}
          >
            <DrawerTitle className="sr-only">Menu</DrawerTitle>
            <div className="flex justify-between items-center px-6 py-[22px] border-b border-border">
              <Logo className="h-[22px]" />
              <DrawerClose
                aria-label="Fermer"
                className="bg-transparent border-0 cursor-pointer text-[32px] leading-none text-foreground w-9 h-9 flex items-center justify-center"
              >
                ×
              </DrawerClose>
            </div>
            <nav className="flex-1 py-3 flex flex-col overflow-y-auto">
              {LINKS.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex justify-between items-center px-6 py-[18px] font-serif text-[22px] tracking-[-0.01em] border-b border-border ${
                    isActive(href) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {label}
                  <span className="font-mono text-sm opacity-40">→</span>
                </Link>
              ))}
            </nav>
            <div className="p-6 border-t border-border flex flex-col gap-2.5 text-[11px] tracking-[0.06em] uppercase text-muted-foreground">
              <span className="font-mono">
                Showroom · 275 Beaubien O · Montréal
              </span>
              <a href="tel:5142225300" className="font-mono text-primary">
                514 222 5300
              </a>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
