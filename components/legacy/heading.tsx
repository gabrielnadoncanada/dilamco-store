import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("m-0 font-sans font-medium text-balance", {
  variants: {
    size: {
      "1": "text-7xl leading-[1.05] tracking-tighter",
      "2": "text-6xl leading-[1.05] tracking-tighter",
      "3": "text-5xl leading-[1.1] tracking-tighter",
      "4": "text-4xl leading-tight tracking-tighter",
      "5": "text-3xl leading-tight tracking-tight",
      "6": "text-2xl leading-snug tracking-tight",
    },
  },
  defaultVariants: { size: "2" },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = NonNullable<VariantProps<typeof headingVariants>["size"]>;

type HeadingProps = Omit<React.ComponentProps<"h2">, "color"> &
  VariantProps<typeof headingVariants> & {
    as?: HeadingTag;
  };

function Heading({ as = "h2", size, className, ...props }: HeadingProps) {
  const Comp = as;
  const resolvedSize: HeadingSize = size ?? (as.slice(1) as HeadingSize);
  return (
    <Comp
      data-slot="heading"
      className={cn(headingVariants({ size: resolvedSize }), className)}
      {...props}
    />
  );
}

export { Heading, headingVariants };
export type { HeadingProps, HeadingTag, HeadingSize };
