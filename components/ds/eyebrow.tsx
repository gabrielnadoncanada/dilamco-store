import { createElement } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "muted" | "on-primary";
type Tag = "span" | "div" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

const TONE_CLASSES: Record<Tone, string> = {
  primary: "text-primary",
  muted: "text-muted-foreground",
  "on-primary": "text-primary-foreground/70",
};

interface Props extends Omit<ComponentProps<"span">, "color"> {
  tone?: Tone;
  as?: Tag;
}

export function Eyebrow({
  tone = "primary",
  as = "span",
  className,
  ...props
}: Props) {
  return createElement(as, {
    className: cn(
      "text-[11px] font-medium uppercase tracking-[0.18em] leading-none",
      TONE_CLASSES[tone],
      className,
    ),
    ...props,
  });
}
