import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "on-primary";

const TONE_CLASSES: Record<Tone, string> = {
  primary: "text-primary",
  "on-primary": "text-primary-foreground/80",
};

interface Props extends ComponentProps<"div"> {
  tone?: Tone;
}

export function StepLabel({ tone = "primary", className, ...props }: Props) {
  return (
    <div
      className={cn(
        "font-mono text-[11px] tracking-[0.08em] leading-none",
        TONE_CLASSES[tone],
        className,
      )}
      {...props}
    />
  );
}
