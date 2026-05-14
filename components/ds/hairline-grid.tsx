import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const hairlineGridVariants = cva(
  "grid gap-px bg-border border border-border",
  {
    variants: {
      cols: {
        "2": "grid-cols-1 min-[700px]:grid-cols-2",
        "3": "grid-cols-1 min-[700px]:grid-cols-2 min-[900px]:grid-cols-3",
        "4": "grid-cols-1 min-[700px]:grid-cols-2 min-[1101px]:grid-cols-4",
      },
      tone: {
        light: "bg-border",
        onPrimary: "bg-white/15 border-white/15",
      },
    },
    defaultVariants: {
      cols: "4",
      tone: "light",
    },
  },
);

interface GridProps
  extends ComponentProps<"div">,
    VariantProps<typeof hairlineGridVariants> {}

export function HairlineGrid({
  className,
  cols,
  tone,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(hairlineGridVariants({ cols, tone }), className)}
      {...props}
    />
  );
}

const cellVariants = cva("p-10 max-[700px]:p-[22px] flex flex-col", {
  variants: {
    surface: {
      background: "bg-background",
      primary: "bg-primary text-background",
      secondary: "bg-secondary",
    },
  },
  defaultVariants: {
    surface: "background",
  },
});

interface CellProps
  extends ComponentProps<"div">,
    VariantProps<typeof cellVariants> {
  children: ReactNode;
}

export function HairlineCell({
  className,
  surface,
  children,
  ...props
}: CellProps) {
  return (
    <div className={cn(cellVariants({ surface }), className)} {...props}>
      {children}
    </div>
  );
}
