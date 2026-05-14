import { Container } from "@/components/ds";
import { SfHero } from "./_components/sf-hero";
import { SfPillars } from "./_components/sf-pillars";
import { SfQuoteBlock } from "./_components/sf-quote-block";
import { ShowroomCta } from "@/components/showroom-cta";

export const metadata = { title: "Savoir-faire · Dilamco" };

export default function SavoirFairePage() {
  return (
    <Container padded className="pb-[120px] max-[700px]:pb-[60px]">
      <SfHero />
      <SfPillars />
      <SfQuoteBlock />
      <ShowroomCta />
    </Container>
  );
}
