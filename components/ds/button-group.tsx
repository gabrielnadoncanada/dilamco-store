import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonGroupVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center",
      vertical: "flex-col items-stretch",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      default: "gap-3",
      lg: "gap-4",
    },
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    gap: "default",
    align: "start",
    wrap: true,
  },
});

interface Props
  extends ComponentProps<"div">,
    VariantProps<typeof buttonGroupVariants> {}

export function ButtonGroup({
  className,
  orientation,
  gap,
  align,
  wrap,
  ...props
}: Props) {
  return (
    <div
      role="group"
      data-slot="button-group"
      className={cn(
        buttonGroupVariants({ orientation, gap, align, wrap }),
        className,
      )}
      {...props}
    />
  );
}
