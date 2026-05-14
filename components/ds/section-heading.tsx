import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";
import { Headline } from "./headline";
import { cn } from "@/lib/utils";

type Tone = "primary" | "muted" | "on-primary";
type Level = "display" | "headline" | "subhead" | "title";

interface Props {
  eyebrow: ReactNode;
  title: ReactNode;
  tone?: Tone;
  level?: Level;
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  tone = "primary",
  level = "headline",
  as,
  className,
  titleClassName,
}: Props) {
  return (
    <header className={cn("flex flex-col gap-3", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <Headline level={level} as={as} className={titleClassName}>
        {title}
      </Headline>
    </header>
  );
}
