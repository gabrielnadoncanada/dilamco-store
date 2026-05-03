import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  accent?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Eyebrow({ accent, className, style, children }: Props) {
  return (
    <span
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
        accent && "text-primary",
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}
