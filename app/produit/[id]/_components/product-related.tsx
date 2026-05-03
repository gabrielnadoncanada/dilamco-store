import { PCard } from "@/components/pcard";
import { Heading } from "@/components/legacy/heading";
import type { Product } from "@/lib/types";

export function ProductRelated({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="mt-[100px] border-t border-border pt-14">
      <Heading
        as="h2"
        variant="serif"
        className="mb-8 text-[32px] tracking-[-0.02em]"
      >
        De la même famille
      </Heading>
      <div className="grid grid-cols-4 gap-x-6 gap-y-8 max-[1100px]:grid-cols-2 max-[700px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-[18px] max-[380px]:grid-cols-1">
        {products.map((p) => (
          <PCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
