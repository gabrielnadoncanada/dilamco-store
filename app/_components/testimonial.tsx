export function Testimonial() {
  return (
    <section className="px-[clamp(20px,4vw,56px)] py-[clamp(100px,12vw,160px)] max-[700px]:py-14 bg-secondary border-b border-border text-center">
      <p className="font-serif italic text-[clamp(28px,3.6vw,48px)] max-[700px]:!text-[22px] leading-[1.2] max-[700px]:!leading-[1.3] tracking-[-0.01em] max-w-[1000px] mx-auto text-foreground">
        « Trois soumissions, trois déceptions. Dilamco a été le seul à nous remettre un prix ferme sous deux jours, et le seul à livrer exactement ce qui avait été dessiné. »
      </p>
      <div className="mt-8 text-xs tracking-[0.14em] uppercase text-muted-foreground">
        Mireille L. · Outremont · Cuisine 42 m²
      </div>
    </section>
  );
}
