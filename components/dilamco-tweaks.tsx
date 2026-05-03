"use client";

import { useEffect } from "react";
import {
  TweakRadio,
  TweakSection,
  TweakToggle,
  TweaksPanel,
  useTweaks,
} from "./tweaks/panel";
import type { Tweaks } from "@/lib/types";

const TWEAK_DEFAULTS: Tweaks = {
  theme: "default",
  density: "comfy",
  showPrices: true,
  serif: "GT Sectra",
  sans: "Söhne",
};

export function DilamcoTweaks() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.body.dataset.theme = tweaks.theme === "default" ? "" : tweaks.theme;
    document.body.dataset.density = tweaks.density;
    document.body.dataset.showPrices = String(tweaks.showPrices);
  }, [tweaks.theme, tweaks.density, tweaks.showPrices]);

  return (
    <TweaksPanel title="Direction visuelle">
      <TweakSection label="Direction visuelle">
        <TweakRadio
          label="Palette"
          value={tweaks.theme}
          onChange={(v) => setTweak("theme", v as Tweaks["theme"])}
          options={[
            { value: "default", label: "Sapin" },
            { value: "warm", label: "Bois brûlé" },
            { value: "ink", label: "Encre" },
          ]}
        />
      </TweakSection>
      <TweakSection label="Catalogue">
        <TweakRadio
          label="Densité"
          value={tweaks.density}
          onChange={(v) => setTweak("density", v as Tweaks["density"])}
          options={[
            { value: "comfy", label: "3 col." },
            { value: "dense", label: "4 col." },
          ]}
        />
        <TweakToggle
          label="Afficher les prix"
          value={tweaks.showPrices}
          onChange={(v) => setTweak("showPrices", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}
