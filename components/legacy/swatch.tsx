import { swatchSlug } from "@/lib/products";
import { cn } from "@/lib/utils";

interface Props {
  color: string;
  size?: "sm" | "lg";
  title?: string;
}

export function Swatch({ color, size = "sm", title }: Props) {
  const colorClass = {
    blanc: "bg-[#f3efe6]",
    chene: "bg-[#c9b48a]",
    bleu: "bg-[#2a3d52]",
  }[swatchSlug(color)];

  return (
    <span
      className={cn(
        "inline-block shrink-0 rounded-full border border-border-strong",
        size === "lg" ? "size-[22px]" : "size-3.5",
        colorClass,
      )}
      title={title}
    />
  );
}
