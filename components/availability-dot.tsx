import { cn } from "@/lib/utils";

/**
 * Pastille de disponibilité — vert dérivé du primary (#253b2f éclairci d'un
 * cran), pas un troisième vert orphelin dans la palette.
 */
export function AvailabilityDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("size-[7px] shrink-0 rounded-full bg-[#3a5c47]", className)}
    />
  );
}
