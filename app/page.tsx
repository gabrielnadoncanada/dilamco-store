import { Hero } from "./_components/hero";
import { Pillars } from "./_components/pillars";
import { Categories } from "./_components/categories";
import { Process } from "./_components/process";
import { StarterKitchens } from "./_components/starter-kitchens";
import { Testimonial } from "./_components/testimonial";
import { Trust } from "./_components/trust";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Categories />
      <StarterKitchens />
      <Process />
      <Testimonial />
      <Trust />
    </>
  );
}
