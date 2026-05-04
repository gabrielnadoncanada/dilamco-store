import Link from "next/link";
import { Logo } from "./logo";
import { Heading } from "./legacy/heading";

export function Footer() {
  return (
    <footer className="bg-foreground px-[clamp(20px,4vw,56px)] pb-8 pt-20 text-background max-[700px]:px-[22px] max-[700px]:pb-6 max-[700px]:pt-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-14 border-b border-background/15 pb-14 max-[900px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-8 max-[700px]:pb-8">
          <div>
            <Logo className="mb-6 h-[26px] text-background fill-background text-white" />
            <p className="max-w-xs text-sm leading-[1.6] opacity-70">
              Distribution premium d&apos;armoires sur mesure depuis Montréal.
              Une chaîne d&apos;approvisionnement maîtrisée, du dessin à
              l&apos;installation.
            </p>
          </div>
          <div>
            <Heading
              as="h4"
              className="mb-[18px] text-[11px] uppercase tracking-[0.14em] opacity-60"
            >
              Catalogue
            </Heading>
            <ul className="flex flex-col gap-2.5 text-sm [&_a]:opacity-85 [&_a:hover]:text-highlight [&_a:hover]:opacity-100">
              <li>
                <Link href="/catalogue?famille=Armoire+murale">
                  Armoires murales
                </Link>
              </li>
              <li>
                <Link href="/catalogue?famille=Armoire+de+bas">
                  Armoires de bas
                </Link>
              </li>
              <li>
                <Link href="/catalogue?famille=Garde-manger">Garde-manger</Link>
              </li>
              <li>
                <Link href="/catalogue?coin=oui">Modules de coin</Link>
              </li>
            </ul>
          </div>
          <div>
            <Heading
              as="h4"
              className="mb-[18px] text-[11px] uppercase tracking-[0.14em] opacity-60"
            >
              Maison
            </Heading>
            <ul className="flex flex-col gap-2.5 text-sm [&_a]:opacity-85 [&_a:hover]:text-highlight [&_a:hover]:opacity-100">
              <li>
                <Link href="/savoir-faire">Notre supply chain</Link>
              </li>
              <li>
                <Link href="/projets">Projets réalisés</Link>
              </li>
              <li>
                <Link href="/collections">Collections</Link>
              </li>
              <li>
                <Link href="/soumission">Demander une soumission</Link>
              </li>
            </ul>
          </div>
          <div>
            <Heading
              as="h4"
              className="mb-[18px] text-[11px] uppercase tracking-[0.14em] opacity-60"
            >
              Contact
            </Heading>
            <ul className="flex flex-col gap-2.5 text-sm [&_a]:opacity-85 [&_a:hover]:text-highlight [&_a:hover]:opacity-100">
              <li>
                9876 Boul. Industriel
                <br />
                Montréal, QC H1Z 2X4
              </li>
              <li>
                <a href="mailto:projets@dilamco.ca">projets@dilamco.ca</a>
              </li>
              <li>
                <a href="tel:5142225300">514 222 5300</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between pt-7 text-[11px] tracking-[0.04em] opacity-50 max-[700px]:flex-col max-[700px]:gap-2 max-[700px]:pt-6">
          <span>© 2026 Dilamco Distribution Inc. — Tous droits réservés</span>
          <span>RBQ 5712-2440-01 · APCHQ membre</span>
        </div>
      </div>
    </footer>
  );
}
