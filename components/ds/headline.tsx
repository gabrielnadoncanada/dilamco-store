import type { ComponentProps } from "react";
import { createElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headlineVariants = cva(
  "font-serif font-normal text-foreground m-0 [&_em]:italic [&_em]:text-primary [&_em]:font-normal",
  {
    variants: {
      level: {
        display:
          "text-[clamp(48px,7vw,96px)] max-[700px]:!text-[clamp(36px,9vw,52px)] leading-[0.98] tracking-[-0.025em]",
        headline:
          "text-[clamp(34px,4.5vw,62px)] leading-[1.02] tracking-[-0.02em]",
        subhead:
          "text-[clamp(28px,3.5vw,40px)] leading-[1.1] tracking-[-0.015em]",
        title: "text-[28px] leading-[1.05] tracking-[-0.02em]",
      },
    },
    defaultVariants: {
      level: "headline",
    },
  },
);

type Tag = "h1" | "h2" | "h3" | "h4" | "p";

interface Props
  extends Omit<ComponentProps<"h2">, "color">,
    VariantProps<typeof headlineVariants> {
  as?: Tag;
}

const DEFAULT_TAG: Record<NonNullable<Props["level"]>, Tag> = {
  display: "h1",
  headline: "h2",
  subhead: "h2",
  title: "h3",
};

export function Headline({ as, level, className, ...props }: Props) {
  const resolvedLevel = level ?? "headline";
  const Tag = as ?? DEFAULT_TAG[resolvedLevel];
  return createElement(Tag, {
    className: cn(headlineVariants({ level: resolvedLevel }), className),
    ...props,
  });
}
