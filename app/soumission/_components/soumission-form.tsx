"use client";

import { Button, ButtonArrow } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SoumissionForm as Form } from "./types";

const BUDGETS = ["25-40k", "40-60k", "60-90k", "90k+"];

const TYPE_PROJET = [
  { value: "cuisine", label: "Cuisine complète" },
  { value: "renovation", label: "Rénovation partielle" },
  { value: "rangement", label: "Rangement sur mesure" },
  { value: "commercial", label: "Projet commercial" },
];

const TIMELINE = [
  { value: "urgent", label: "Sous 1 mois" },
  { value: "1-3mois", label: "1 à 3 mois" },
  { value: "3-6mois", label: "3 à 6 mois" },
  { value: "6mois+", label: "Plus de 6 mois" },
];

interface Props {
  form: Form;
  setForm: (fn: (prev: Form) => Form) => void;
  onSubmit: () => void;
}

const fieldLabel =
  "text-[11px] tracking-[0.1em] uppercase text-muted-foreground font-medium";
const fieldControl =
  "h-auto border-input bg-background px-3.5 py-3 text-sm text-foreground shadow-none focus-visible:border-ring focus-visible:ring-0";

export function SoumissionForm({ form, setForm, onSubmit }: Props) {
  const update = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <section className="mb-10">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-primary mb-6 pb-3 border-b border-border">
          01 — Vos coordonnées
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4 max-[700px]:grid-cols-1 max-[700px]:gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="prenom" className={fieldLabel}>Prénom</Label>
            <Input
              id="prenom"
              required
              value={form.prenom}
              onChange={(e) => update("prenom", e.target.value)}
              className={fieldControl}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nom" className={fieldLabel}>Nom</Label>
            <Input
              id="nom"
              required
              value={form.nom}
              onChange={(e) => update("nom", e.target.value)}
              className={fieldControl}
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4 max-[700px]:grid-cols-1 max-[700px]:gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className={fieldLabel}>Courriel</Label>
            <Input
              id="email"
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={fieldControl}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tel" className={fieldLabel}>Téléphone</Label>
            <Input
              id="tel"
              required
              type="tel"
              value={form.tel}
              onChange={(e) => update("tel", e.target.value)}
              placeholder="514 555 0000"
              className={fieldControl}
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="code_postal" className={fieldLabel}>
              Code postal de l&apos;installation
            </Label>
            <Input
              id="code_postal"
              required
              value={form.code_postal}
              onChange={(e) => update("code_postal", e.target.value)}
              placeholder="H2T 1B5"
              className={fieldControl}
            />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-primary mb-6 pb-3 border-b border-border">
          02 — Le projet
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4 max-[700px]:grid-cols-1 max-[700px]:gap-3">
          <div className="flex flex-col gap-1.5">
            <Label className={fieldLabel}>Type de projet</Label>
            <Select
              value={form.type_projet}
              onValueChange={(v) => update("type_projet", v)}
            >
              <SelectTrigger className={`${fieldControl} w-full data-[size=default]:h-auto`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="">
                {TYPE_PROJET.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className={fieldLabel}>Échéancier souhaité</Label>
            <Select
              value={form.timeline}
              onValueChange={(v) => update("timeline", v)}
            >
              <SelectTrigger className={`${fieldControl} w-full data-[size=default]:h-auto`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="">
                {TIMELINE.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mt-3">
          <Label className={fieldLabel}>Budget approximatif</Label>
          <RadioGroup
            value={form.budget}
            onValueChange={(v) => update("budget", v)}
            className="mt-1 grid grid-cols-4 gap-2 max-[1000px]:grid-cols-2"
          >
            {BUDGETS.map((b) => (
              <Label
                key={b}
                htmlFor={`budget-${b}`}
                className="flex items-center justify-center gap-2 p-3 border border-input bg-background text-[13px] tracking-[0.02em] normal-case font-normal text-foreground/70 cursor-pointer transition-all has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary has-[[data-state=checked]]:text-foreground"
              >
                <RadioGroupItem
                  id={`budget-${b}`}
                  value={b}
                  className="size-3 border-input data-[state=checked]:border-primary data-[state=checked]:text-primary"
                />
                ${b}
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="notes" className={fieldLabel}>
              Notes complémentaires (contexte, contraintes, inspirations)
            </Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Ex. cuisine en L, plafond 9 pi, projet de rénovation totale incluant îlot et garde-manger…"
              className={`${fieldControl} min-h-[120px] resize-y leading-[1.5]`}
            />
          </div>
        </div>
      </section>

      <Button type="submit" className="px-9 py-[18px] text-sm">
        Envoyer la demande <ButtonArrow />
      </Button>
    </form>
  );
}
