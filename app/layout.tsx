import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart-provider";
import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { DilamcoTweaks } from "@/components/dilamco-tweaks";
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
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Topbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <DilamcoTweaks />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
