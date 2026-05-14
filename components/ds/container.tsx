import { createElement } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "section" | "main" | "article" | "header" | "footer";

interface Props {
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Container({ as = "div", className, style, children }: Props) {
  return createElement(
    as,
    {
      className: cn("mx-auto w-full max-w-[1440px]", className),
      style,
    },
    children,
  );
}
