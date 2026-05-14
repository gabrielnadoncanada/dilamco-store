import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "muted" | "on-primary";

const TONE_CLASSES: Record<Tone, string> = {
  primary: "text-primary",
  muted: "text-muted-foreground",
  "on-primary": "text-primary-foreground/70",
};

interface Props extends ComponentProps<"span"> {
  tone?: Tone;
}

export function Eyebrow({ tone = "primary", className, ...props }: Props) {
  return (
    <span
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.18em] leading-none",
        TONE_CLASSES[tone],
        className,
      )}
      {...props}
    />
  );
}
