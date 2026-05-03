import { SfHero } from "./_components/sf-hero";
import { SfPillars } from "./_components/sf-pillars";
import { SfQuoteBlock } from "./_components/sf-quote-block";
import { SfVisitBlock } from "./_components/sf-visit-block";

export const metadata = { title: "Savoir-faire · Dilamco" };

export default function SavoirFairePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pb-[120px] max-[700px]:px-[18px] max-[700px]:pb-[60px]">
      <SfHero />
      <SfPillars />
      <SfQuoteBlock />
      <SfVisitBlock />
    </div>
  );
}
