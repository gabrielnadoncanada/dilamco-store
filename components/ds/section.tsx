import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("px-[clamp(20px,4vw,56px)] max-[700px]:py-14", {
  variants: {
    surface: {
      background: "bg-background",
      secondary: "bg-secondary",
      primary: "bg-primary text-background",
    },
    density: {
      default: "py-[clamp(80px,10vw,130px)]",
      tall: "py-[clamp(100px,12vw,160px)]",
      compact: "py-[clamp(40px,9vw,70px)]",
    },
    divider: {
      true: "border-b border-border",
      false: "",
    },
  },
  defaultVariants: {
    surface: "background",
    density: "default",
    divider: true,
  },
});

interface Props
  extends ComponentProps<"section">, VariantProps<typeof sectionVariants> {}

export function Section({
  className,
  surface,
  density,
  divider,
  ...props
}: Props) {
  return (
    <section
      className={cn(sectionVariants({ surface, density, divider }), className)}
      {...props}
    />
  );
}
