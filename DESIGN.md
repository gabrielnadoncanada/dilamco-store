---
name: Dilamco
description: Armoires de cuisine en stock, prix affichés, soumission en ligne. Design system d'atelier, sans flafla.
colors:
  background: "#faf8f4"
  foreground: "#1a1f1c"
  soft-foreground: "#2a3330"
  card: "#ffffff"
  primary: "#253b2f"
  primary-foreground: "#faf8f4"
  secondary: "#f3eee5"
  muted: "#ebe5d8"
  muted-foreground: "#6c7068"
  accent: "#f3eee5"
  accent-foreground: "#253b2f"
  destructive: "#8a3a2a"
  border: "#dcd5c5"
  border-strong: "#b6ab93"
  highlight: "#c8b890"
typography:
  display:
    fontFamily: "GT Sectra, Tiempos Headline, Lyon, Georgia, serif"
    fontSize: "clamp(48px, 7vw, 96px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "GT Sectra, Tiempos Headline, Lyon, Georgia, serif"
    fontSize: "clamp(34px, 4.5vw, 62px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "GT Sectra, Tiempos Headline, Lyon, Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, Sohne, Suisse Int'l, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
    fontFeature: '"ss01", "kern"'
  label:
    fontFamily: "Geist, Sohne, Suisse Int'l, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.18em"
  mono-label:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  sm: "0px"
  md: "0px"
  lg: "0px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "56px"
  3xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-ghost-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
  button-paper:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.background}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  cat-card:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "32px"
  hairline-cell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "40px"
  eyebrow-label:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
---

# Design System: Dilamco

## 1. Overview

**Creative North Star: "L'Atelier honnête"**

Dilamco vend des armoires de cuisine en stock à prix affichés. Le design system reflète ce contrat : direct, transparent, fier de son matériel. On parle comme un menuisier de quartier qui te montre ses caissons, pas comme un cuisiniste qui te vend une expérience. Le serif éditorial GT Sectra porte la voix (sérieuse, posée), le sans Geist porte les faits (15px, lisible, propre), la mono JetBrains numérote les étapes comme des cotes sur un plan.

Les surfaces sont planes. Les coins sont vifs (radius 0). Les bordures sont fines (1px) et omniprésentes : elles séparent les sections, encadrent les grids, structurent l'information sans faire de bruit. Le vert forêt profond (#253b2f) tient le rôle d'accent, jamais de fond. La crème chaude (#faf8f4) est la matière par défaut.

Ce système rejette explicitement : les codes du luxe, le sur-mesure, le savoir-faire d'exception, le branding signature, le jargon de cuisiniste. Il rejette aussi les tics SaaS contemporains : gradients texte, glassmorphism, cards molletonnées avec ombres roses, big-number hero, hero-metrics neon. Si ça ressemble à une page de licorne, c'est raté.

**Key Characteristics:**
- Crème chaude par défaut, vert forêt en accent (≤10% de l'écran)
- Serif éditorial GT Sectra pour la voix, Geist pour les faits, mono pour les cotes
- Coins vifs partout (radius 0px), bordures fines (1px), aucune ombre par défaut
- Eyebrow labels uppercase 11px tracking 0.18em : signature visuelle récurrente
- Grid hairline (gap-px sur fond bordure) pour les séries de cellules

## 2. Colors: La Palette d'Atelier

Une palette restreinte, chaude, tirée vers la crème et le bois. Le vert forêt est l'unique accent saturé, et il est rare. Les neutres sont tous tintés vers le sable ou le warm-gray pour éviter la stérilité d'un blanc pur.

### Primary
- **Vert Forêt Profond** (#253b2f) : accent principal. Sur les CTA primaires, les eyebrows de section, les liens, les ring de focus. Jamais utilisé comme fond sauf dans la section Trust (où il devient drenché à 100% pour casser le rythme crème).

### Secondary
- **Crème Sable** (#f3eee5) : surface de section (Hero, Categories, Testimonial). C'est ce qui fait respirer entre les sections background.

### Neutral
- **Crème Atelier** (#faf8f4) : fond de page par défaut. Crème chaude, jamais blanc.
- **Encre Forêt** (#1a1f1c) : couleur de texte principale. Très foncé, légèrement teinté vert pour ne pas trancher avec le primary.
- **Encre Adoucie** (#2a3330) : variantes de texte secondaires (paragraphes longs).
- **Carton Blanc** (#ffffff) : surface de carte stricte, à utiliser parcimonieusement (le système préfère secondary + border).
- **Cendre Sable** (#ebe5d8) : surface muted, fond de cat-card avant chargement de l'image.
- **Gris Pierre** (#6c7068) : muted-foreground, pour les libellés secondaires et descriptions.
- **Bordure Lin** (#dcd5c5) : bordure standard, omniprésente.
- **Bordure Foin** (#b6ab93) : bordure renforcée, pour les inputs et les séparateurs structurels.
- **Sable Doré** (#c8b890) : highlight, utilisé pour les grands chiffres dans la section Trust, et les accents subtils sur fond primary.

### Accent
- **Argile Cuite** (#8a3a2a) : destructive uniquement. Erreurs, suppressions. Jamais décoratif.

### Named Rules

**La Règle du 10%.** Le vert forêt primaire couvre au maximum 10% de la surface visible d'un écran : CTA, eyebrows, liens, italics dans les headlines. Au-delà, il devient envahissant et trahit la promesse "sans flafla".

**La Règle du Crème Tinté.** Aucun blanc pur (#fff) en surface de page. Le système est tiré vers le sable (#faf8f4 ou #f3eee5). #ffffff existe pour les cards stricts, pas pour les fonds de section.

**La Règle de l'Italic Citation.** L'italic dans une headline est porté par le primary, pas par une variante de neutre. C'est l'effet "passage clé du paragraphe", pas une décoration.

## 3. Typography

**Display Font:** GT Sectra (avec fallback Tiempos Headline, Lyon, Georgia)
**Body Font:** Geist (avec fallback Sohne, Suisse Int'l, system-ui)
**Mono Font:** JetBrains Mono (avec fallback ui-monospace, SF Mono, Menlo)

**Character:** GT Sectra apporte une autorité éditoriale (presse écrite de qualité, pas magazine de luxe). Geist est neutre, technique, propre, lisible à 15px sans bruit. JetBrains Mono donne aux étapes numérotées la précision d'une cote de plan. Les trois fontes ne se mélangent jamais dans un même bloc : serif pour les titres, sans pour le corps, mono pour les libellés numériques.

### Hierarchy

- **Display** (400, clamp(48px, 7vw, 96px), lh 0.98, ls -0.025em) : H1 du Hero uniquement. Italic du primary autorisé pour la mise en valeur d'un fragment de phrase.
- **Headline** (400, clamp(34px, 4.5vw, 62px), lh 1.02, ls -0.02em) : H2 d'ouverture de section. Toujours précédé d'un eyebrow label.
- **Title** (400, 28px, lh 1.05, ls -0.02em) : H3 dans les cellules de grid (Pillars, cards). Pas de capping responsive.
- **Body** (400, 15px, lh 1.55, font-feature ss01 + kern) : tout texte courant. Max 65 à 75ch de largeur. Couleur soft-foreground pour les paragraphes longs, foreground pour les phrases courtes.
- **Label** (500, 11px, ls 0.18em, uppercase, Geist) : eyebrow de section. Couleur primary par défaut, primary-foreground/70 sur fond primary.
- **Mono Label** (400, 11px, ls 0.08em, JetBrains Mono) : numérotation d'étape ("ÉTAPE 01"), libellés techniques. Couleur primary.

### Named Rules

**La Règle de l'Eyebrow.** Toute headline de section est précédée d'un eyebrow label. Un H2 nu, sans contexte au-dessus, est interdit : il manque la "promesse" (de quoi on parle).

**La Règle 65ch.** Les paragraphes de corps ne dépassent jamais 65 à 75 caractères de largeur. Au-delà, on passe en deux colonnes ou on resserre le max-width (max-w-[480px] est le standard du projet).

**La Règle du Mono Numérique.** Tout chiffre qui sert de cote, d'étape, de référence (et non de montant) passe en JetBrains Mono. Les prix restent en Geist : ils sont des faits commerciaux, pas des cotes techniques.

## 4. Elevation

Le système est plat par défaut. Aucun box-shadow décoratif. La profondeur vient de trois mécanismes :

1. **Hairline borders** (1px solid var(--border)) : séparent les sections, encadrent les grids.
2. **Tonal layering** : background (#faf8f4) → secondary (#f3eee5) → muted (#ebe5d8). Les sections alternent ces teintes pour créer du rythme vertical sans ombre.
3. **Hairline grid** : pour les séries de cellules (Pillars, Trust), la technique standard est `grid gap-px` sur un parent `bg-border`. Chaque cellule remet son propre `bg-background` ou `bg-primary`. Résultat : une grille séparée par des traits 1px, sans ombre, sans border individuel sur chaque cellule.

### Named Rules

**La Règle du Plat par Défaut.** Aucun box-shadow par défaut. Les ombres apparaissent uniquement comme réponse à un état (hover, focus visible, dropdown ouvert), et restent diffuses (radius >16px, opacity <12%).

**La Règle du Hairline Grid.** Pour toute grille de cellules égales (étapes, stats, features), utiliser `grid gap-px bg-border` plutôt que `border` individuel. Ça produit une vraie hairline continue, alignée parfaitement, sans doublons aux jonctions.

**La Règle du Translate Hover.** L'élévation interactive se fait par `translateY(-3px)` sur les liens-cartes (CatCard) et par `translateX(+3px)` sur les flèches de bouton (ButtonArrow). Pas de scale, pas de shadow drop. Le mouvement remplace la profondeur.

## 5. Components

### Buttons

- **Shape:** angles vifs (radius 0). Bordure 1px transparente par défaut, qui se révèle dans certains variants (ghost).
- **Typography:** Label uppercase, Geist 13px (default), tracking 0.08em, weight 500.
- **Padding:** 14px 28px (default), 10px 18px (small), 18px 32px (xl).
- **Primary:** fond primary, texte primary-foreground. Hover : `bg-primary/90` (subtil, pas de translate).
- **Ghost:** transparent, bordure foreground, texte foreground. Hover : inversion complète (fond foreground, texte background).
- **Paper:** fond background, texte primary. Pour les zones sombres (section Trust drenchée en primary).
- **Ghost-light:** transparent, bordure background/40, texte background. Pour les CTA secondaires sur fond primary.
- **ButtonArrow:** flèche unicode → qui translate +3px à droite au hover du parent. Présente sur tous les CTA narratifs ("Créer ma cuisine →").

### Cat Cards (Cartes Catégorie)

- **Shape:** angles vifs (radius 0), aspect-ratio 4/5 (4/3 pour featured sur mobile, libre sur desktop).
- **Background:** image cover + gradient overlay du bas vers le haut (rgba(26,31,28,0.85) → transparent).
- **Typography:** H3 serif large (32px standard, 56px featured), texte background, label uppercase 12px tracking 0.1em.
- **Hover:** carte translate-Y -3px (400ms ease), image inner scale 1.04 (600ms ease).
- **Padding interne:** 32px (p-8).

### Hairline Cells (Cellules de grid)

- **Pattern:** parent `grid gap-px bg-border`, chaque cellule `bg-background` (ou `bg-primary` pour Trust).
- **Padding interne:** 40px desktop (p-10), 22px mobile.
- **Structure type:** mono-label numéroté en haut, H3 serif title, body 13-14px en muted-foreground.

### Eyebrow Labels

- **Style:** uppercase, Geist 11px, weight 500, letter-spacing 0.18em.
- **Couleur:** primary par défaut, primary-foreground/70 sur fond primary.
- **Placement:** toujours au-dessus d'un H2, marge inférieure 12px (mt-3 sur le H2).
- **Rôle:** annonce le sujet de la section. C'est la "table des matières" inline.

### Sections

- **Padding:** vertical `clamp(80px, 10vw, 130px)` desktop, 56px (py-14) mobile. Horizontal `clamp(20px, 4vw, 56px)`.
- **Container:** `max-w-[1440px] mx-auto`. Aucun container plus étroit, sauf paragraphes (max-w-[480px]).
- **Séparateur:** `border-b border-border` entre chaque section, pas de marge ajoutée.

### Testimonial

- **Composition:** un seul paragraphe italic serif, centré, max-w-[1000px], font-size clamp(28px, 3.6vw, 48px), lh 1.2.
- **Attribution:** sous le bloc, label uppercase 12px tracking 0.14em, couleur muted-foreground.
- **Aucun avatar, aucun encadrement.** Le témoignage est traité comme une citation éditoriale, pas comme une carte LinkedIn.

## 6. Do's and Don'ts

### Do:
- **Do** garder le vert forêt primary à ≤10% de la surface visible (CTA, eyebrows, liens, italics dans les headlines).
- **Do** précéder chaque H2 d'eyebrow d'un label uppercase 11px tracking 0.18em couleur primary.
- **Do** utiliser `grid gap-px bg-border` pour toute série de cellules, jamais des `border` individuels.
- **Do** alterner les fonds de section (background → secondary → background → primary) pour créer du rythme vertical.
- **Do** mettre les chiffres techniques (étapes, cotes, références) en JetBrains Mono. Les montants restent en Geist.
- **Do** garder les boutons en uppercase tracking 0.08em weight 500. C'est la signature des CTA.
- **Do** utiliser `translateY(-3px)` sur les cartes interactives, `translateX(+3px)` sur les ButtonArrow. Pas de scale, pas de shadow drop.
- **Do** capper les paragraphes de corps à 65 à 75 caractères de largeur (le standard projet est `max-w-[480px]`).
- **Do** parler comme un menuisier de quartier : phrases courtes, langage d'action ("monte ta cuisine", "vois ton prix"), québécois sans en faire trop.

### Don't:
- **Don't** utiliser un blanc pur (#ffffff) en fond de page. La crème (#faf8f4) est la matière par défaut.
- **Don't** ajouter de border-radius. Le système est radius 0 partout. Une carte arrondie casse l'identité d'atelier.
- **Don't** ajouter de box-shadow décoratif. Le système est plat. La profondeur vient des bordures et du tonal layering.
- **Don't** utiliser le vocabulaire luxe : "haut de gamme", "sur-mesure", "signature", "bespoke", "exclusif", "savoir-faire d'exception", "expérience client", "design d'auteur", "partenaire de confiance". Ces mots sont prohibés dans la copy ET dans les noms de tokens.
- **Don't** utiliser de gradient texte (`background-clip: text`). Jamais. L'emphase passe par le poids ou par l'italic primary.
- **Don't** utiliser de glassmorphism, de blur, de cards translucides. Le système est mat et opaque.
- **Don't** utiliser de side-stripe border (`border-left: 4px solid color`). Pour un accent, utiliser un fond tinté ou un eyebrow label.
- **Don't** empiler des cards (card dans une card). Si une grille suffit, c'est qu'une grille suffit.
- **Don't** utiliser le pattern hero-metric (gros chiffre + petit label + accent gradient). C'est un cliché SaaS. Si on doit afficher des chiffres, utiliser le pattern Trust : grid hairline sur fond primary, chiffres serif highlight.
- **Don't** utiliser d'em dash dans la copy. Préférer la virgule, le deux-points, les parenthèses.
- **Don't** utiliser de modal sauf si toutes les alternatives inline et progressives ont été épuisées. La soumission n'est pas un modal, c'est une page.
- **Don't** sortir une H2 nue sans eyebrow au-dessus. Il manque la promesse.
