import Image from "next/image";
import Link from "next/link";

interface Props {
  featured?: boolean;
  img: string;
  count: number;
  title: string;
  href: string;
}

export function CatCard({ featured, img, count, title, href }: Props) {
  return (
    <Link
      className={`max-w-full group relative cursor-pointer overflow-hidden bg-muted transition-transform duration-[400ms] ease  ${
        featured
          ? "min-[901px]:row-span-2 min-[901px]:[aspect-ratio:auto] min-[901px]:min-h-[600px] aspect-[4/5] max-[900px]:[grid-column:span_2] max-[900px]:[aspect-ratio:4/3] max-[900px]:min-h-[320px]  max-[700px]:min-h-[280px]"
          : "aspect-[4/5]"
      }`}
      href={href}
    >
      <Image
        src={img}
        alt={title}
        fill
        sizes={
          featured
            ? "(max-width: 900px) 100vw, 50vw"
            : "(max-width: 900px) 50vw, 25vw"
        }
        className="object-cover transition-transform duration-[600ms] ease group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,31,28,0.85)] via-[rgba(26,31,28,0.15)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
        <h3
          className={`font-serif leading-none tracking-[-0.02em] my-2 ${
            featured
              ? "text-[56px] max-[700px]:!text-[36px]"
              : "text-[32px] max-[700px]:!text-[28px]"
          }`}
        >
          {title}
        </h3>
        <span className="text-xs tracking-[0.1em] uppercase flex items-center gap-2 opacity-90">
          Voir les prix <span>→</span>
        </span>
      </div>
    </Link>
  );
}
