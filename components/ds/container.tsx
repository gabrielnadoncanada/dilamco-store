import { createElement } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "section" | "main" | "article" | "header" | "footer";

interface Props {
  as?: Tag;
  padded?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Container({
  as = "div",
  padded = false,
  className,
  style,
  children,
}: Props) {
  return createElement(
    as,
    {
      className: cn(
        "mx-auto w-full max-w-[1440px]",
        padded && "px-[clamp(20px,1rem,56px)] max-[700px]:px-[18px]",
        className,
      ),
      style,
    },
    children,
  );
}
