import Link from "next/link";
import { Logo } from "./logo";
import { Container, Eyebrow, Body } from "@/components/ds";
import { routes } from "@/lib/routes";

export function Footer() {
  return (
    <footer className="bg-foreground px-[clamp(20px,4vw,56px)] pb-8 pt-20 text-background max-[700px]:px-[22px] max-[700px]:pb-6 max-[700px]:pt-14">
      <Container>
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-14 border-b border-background/15 pb-14 max-[900px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-8 max-[700px]:pb-8">
          <div>
            <Logo className="mb-6 h-[26px] text-background fill-background text-white" />
            <Body size="sm" className="max-w-xs opacity-70 text-white">
              Armoires de cuisine en stock, à prix accessibles. Parcourez le
              catalogue, voyez les prix et montez votre cuisine en ligne.
            </Body>
          </div>
          <div>
            <Eyebrow as="h4" tone="on-primary" className="mb-[18px]">
              Catalogue
            </Eyebrow>
            <ul className="flex flex-col gap-2.5 text-sm [&_a]:opacity-85 [&_a:hover]:text-highlight [&_a:hover]:opacity-100">
              <li>
                <Link href={routes.collection("wall-cabinet")}>
                  Armoires murales
                </Link>
              </li>
              <li>
                <Link href={routes.collection("base-cabinet")}>
                  Armoires du bas
                </Link>
              </li>
              <li>
                <Link href={routes.collection("utility-cabinet")}>
                  Armoires utilitaires
                </Link>
              </li>
              <li>
                <Link href={routes.collection("fillers-panels-moldings")}>
                  Fillers, panneaux &amp; moulures
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Eyebrow as="h4" tone="on-primary" className="mb-[18px]">
              Maison
            </Eyebrow>
            <ul className="flex flex-col gap-2.5 text-sm [&_a]:opacity-85 [&_a:hover]:text-highlight [&_a:hover]:opacity-100">
              <li>
                <Link href={routes.finishes}>Finitions</Link>
              </li>
              <li>
                <Link href={routes.craftsmanship}>Notre savoir-faire</Link>
              </li>
              <li>
                <Link href={routes.projects}>Projets réalisés</Link>
              </li>
              <li>
                <Link href={routes.quote}>Demander une soumission</Link>
              </li>
            </ul>
          </div>
          <div>
            <Eyebrow as="h4" tone="on-primary" className="mb-[18px]">
              Contact
            </Eyebrow>
            <ul className="flex flex-col gap-2.5 text-sm [&_a]:opacity-85 [&_a:hover]:text-highlight [&_a:hover]:opacity-100">
              <li>
                9876 Boul. Industriel
                <br />
                Montréal, QC H1Z 2X4
              </li>
              <li>
                <a href="mailto:ventes@dilamco.ca">ventes@dilamco.ca</a>
              </li>
              <li>
                <a href="tel:+15142225300">514-222-5300</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between pt-7 text-[11px] tracking-[0.04em] opacity-50 max-[700px]:flex-col max-[700px]:gap-2 max-[700px]:pt-6">
          <span>© 2026 Dilamco inc. — Tous droits réservés</span>
          <span>RBQ 5712-2440-01</span>
        </div>
      </Container>
    </footer>
  );
}
