import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { CartProvider } from "@/components/cart-provider";
import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { DilamcoTweaks } from "@/components/dilamco-tweaks";
import { HelpButton } from "@/components/help-button";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Dilamco · Distribution premium d'armoires sur mesure — Montréal",
  description:
    "Distribution exclusive d'armoires sur mesure issues d'une seule usine partenaire. Contreplaqué, bouleau massif, finition Shaker.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <body className="group/body">
        <NuqsAdapter>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Topbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <HelpButton />
              <DilamcoTweaks />
            </div>
          </CartProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
