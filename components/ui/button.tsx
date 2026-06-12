import type { ComponentProps, HTMLAttributes } from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2.5 border border-transparent font-medium uppercase tracking-[0.08em] transition-all duration-[180ms] cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost:
          "bg-transparent border-foreground text-foreground hover:bg-foreground hover:text-background",
        paper:
          "bg-background text-primary hover:bg-secondary",
        "ghost-light":
          "bg-transparent border-background/40 text-background hover:bg-background hover:text-primary hover:border-background",
      },
      size: {
        default: "px-7 py-3.5 text-[13px]",
        small: "px-[18px] py-2.5 text-[11px]",
        xl: "px-8 py-[18px] text-[13px]",
        icon: "size-9 p-0",
        "icon-xs": "size-5 p-0 [&_svg]:size-3",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      block: false,
    },
  }
);

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, block, className }))}
      {...props}
    />
  );
}

function ButtonArrow({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block transition-transform duration-200 group-hover:translate-x-[3px]",
        className
      )}
      {...props}
    >
      →
    </span>
  );
}

export { Button, ButtonArrow, buttonVariants };
