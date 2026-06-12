"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, Mail, MapPin, X } from "lucide-react";

/**
 * Bouton d'aide flottant — l'équivalent léger du chat des concurrents :
 * aucune dépendance externe, juste les vrais canaux (téléphone, courriel,
 * salle de montre) à portée de clic sur toutes les pages.
 */
export function HelpButton() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={panelRef} className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 max-[700px]:bottom-[104px] max-[700px]:right-3">
      {open && (
        <div className="w-[300px] border border-border bg-background p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <p className="font-serif text-lg leading-[1.25] text-foreground">
            Une question sur votre projet&nbsp;?
          </p>
          <p className="mt-1.5 text-xs leading-[1.5] text-muted-foreground">
            Réponse le jour même, du lundi au vendredi.
          </p>
          <ul className="mt-4 flex flex-col gap-3 text-[13px]">
            <li>
              <a
                href="tel:+15142225300"
                className="flex items-center gap-2.5 text-foreground hover:text-primary"
              >
                <Phone className="size-4 text-primary" /> 514-222-5300
              </a>
            </li>
            <li>
              <a
                href="mailto:ventes@dilamco.ca"
                className="flex items-center gap-2.5 text-foreground hover:text-primary"
              >
                <Mail className="size-4 text-primary" /> ventes@dilamco.ca
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-soft-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Salle de montre — 275 rue Beaubien Ouest, Montréal
                <br />
                Lun – ven · 9h à 17h
              </span>
            </li>
          </ul>
        </div>
      )}
      <button
        aria-label={open ? "Fermer l'aide" : "Besoin d'aide ?"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>
    </div>
  );
}
