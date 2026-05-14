import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bodyVariants = cva("leading-[1.6] m-0", {
  variants: {
    size: {
      compact: "text-[13px]",
      sm: "text-sm",
      default: "text-base",
      lead: "text-[17px]",
    },
    tone: {
      default: "text-foreground",
      soft: "text-soft-foreground",
      muted: "text-muted-foreground",
      "on-primary": "text-background/85",
    },
  },
  defaultVariants: {
    size: "default",
    tone: "soft",
  },
});

interface Props
  extends ComponentProps<"p">,
    VariantProps<typeof bodyVariants> {}

export function Body({ className, size, tone, ...props }: Props) {
  return (
    <p
      className={cn(bodyVariants({ size, tone }), className)}
      {...props}
    />
  );
}
