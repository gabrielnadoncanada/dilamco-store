import { Hero } from "./_components/hero";
import { Pillars } from "./_components/pillars";
import { Categories } from "./_components/categories";
import { Process } from "./_components/process";
import { Testimonial } from "./_components/testimonial";
import { Trust } from "./_components/trust";
import Packages from "./_components/packages";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Categories />
      <Process />
      <Packages />
      <Testimonial />
      <Trust />
    </>
  );
}
