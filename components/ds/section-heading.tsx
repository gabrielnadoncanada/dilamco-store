import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";
import { Headline } from "./headline";
import { cn } from "@/lib/utils";
import { Body } from "./body";

type Surface = "background" | "secondary" | "primary";
type Level = "display" | "headline" | "subhead" | "title";

type SurfaceTokens = {
  eyebrow: "primary" | "on-primary";
  body: "muted" | "on-primary";
  title: string;
};

const SURFACE_TOKENS: Record<Surface, SurfaceTokens> = {
  background: { eyebrow: "primary", body: "muted", title: "" },
  secondary: { eyebrow: "primary", body: "muted", title: "" },
  primary: { eyebrow: "on-primary", body: "on-primary", title: "text-background" },
};

interface Props {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  surface?: Surface;
  level?: Level;
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  surface = "background",
  level = "headline",
  as,
  className,
  titleClassName,
}: Props) {
  const tokens = SURFACE_TOKENS[surface];
  return (
    <header className={cn("flex flex-col gap-3", className)}>
      <Eyebrow tone={tokens.eyebrow}>{eyebrow}</Eyebrow>
      <Headline
        level={level}
        as={as}
        className={cn(tokens.title, titleClassName)}
      >
        {title}
      </Headline>
      {description && (
        <Body size="default" tone={tokens.body} className="mt-1">
          {description}
        </Body>
      )}
    </header>
  );
}
