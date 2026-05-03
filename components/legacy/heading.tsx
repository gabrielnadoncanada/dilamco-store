import { createElement } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "h4";
type Variant = "display" | "section" | "serif" | "plain";

interface Props {
  as: Tag;
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Heading({
  as,
  variant = "plain",
  className,
  style,
  children,
}: Props) {
  const variantClass = {
    display:
      "font-serif text-[clamp(48px,7vw,96px)] leading-[0.98] tracking-[-0.025em]",
    section:
      "font-serif text-[clamp(34px,4.5vw,62px)] leading-[1.02] tracking-[-0.02em]",
    serif: "font-serif",
    plain: "",
  }[variant];
  const cls = cn("m-0 font-normal", variantClass, className);
  return createElement(
    as,
    { className: cls, style },
    children,
  );
}
