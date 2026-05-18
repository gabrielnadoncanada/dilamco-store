import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Headline } from "./headline";
import { Body } from "./body";

interface Props extends ComponentProps<"section"> {
  imageSrc: string;
  imagePosition?: "left" | "right";
  eyebrow?: ReactNode;
  headline: ReactNode;
  body: ReactNode;
  mediaClassName?: string;
  contentClassName?: string;
  children?: ReactNode;
}

export function SplitMediaCta({
  imageSrc,
  imagePosition = "left",
  eyebrow,
  headline,
  body,
  mediaClassName,
  contentClassName,
  className,
  children,
  ...props
}: Props) {
  const gridCols =
    imagePosition === "left"
      ? "grid-cols-[1.1fr_0.9fr]"
      : "grid-cols-[0.9fr_1.1fr]";

  const media = (
    <div
      className={cn(
        "min-h-[560px] bg-cover bg-center max-[900px]:order-1 max-[700px]:min-h-[320px]",
        mediaClassName,
      )}
      style={{ backgroundImage: `url(${imageSrc})` }}
    />
  );

  const content = (
    <div
      className={cn(
        "flex flex-col justify-center bg-card p-14 max-[900px]:order-2 max-[700px]:p-7",
        contentClassName,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Headline level="headline" as="h2" className="mt-4">
        {headline}
      </Headline>
      <Body size="sm" tone="soft" className="mt-5 leading-[1.7]">
        {body}
      </Body>
      {children}
    </div>
  );

  return (
    <section className={className} {...props}>
      <div
        className={cn(
          "grid border border-border max-[900px]:grid-cols-1",
          gridCols,
        )}
      >
        {imagePosition === "left" ? (
          <>
            {media}
            {content}
          </>
        ) : (
          <>
            {content}
            {media}
          </>
        )}
      </div>
    </section>
  );
}
