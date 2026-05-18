"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eyebrow } from "./eyebrow";
import { Headline } from "./headline";
import { Body } from "./body";
import { Section } from "./section";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";

export type MediaTabItem = {
  id: string;
  label: string;
  imageSrc: string;
  imageAlt?: string;
  badge?: ReactNode;
  callout?: ReactNode;
  footerText?: ReactNode;
  actions?: ReactNode;
};

interface Props {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  items: MediaTabItem[];
  defaultItemId?: string;
  className?: string;
}

export function MediaTabs({
  eyebrow,
  title,
  description,
  items,
  defaultItemId,
  className,
}: Props) {
  const initial =
    defaultItemId && items.some((i) => i.id === defaultItemId)
      ? defaultItemId
      : items[0]?.id;
  const [active, setActive] = useState<string | undefined>(initial);

  if (!items.length) return null;

  return (
    <Tabs
      value={active}
      onValueChange={setActive}
      className={cn(className)}
      asChild
    >
      <Section surface="secondary" density="compact">
        <Container>
          <div className="flex justify-between items-center gap-6 flex-wrap">
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            <TabsList>
              {items.map((item) => (
                <TabsTrigger key={item.id} value={item.id}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="mx-auto w-full max-w-[1440px]">
            <div className="grid grid-cols-[1fr_auto] items-end gap-8 max-[900px]:grid-cols-1 max-[900px]:items-start"></div>

            {items.map((item) => (
              <TabsContent key={item.id} value={item.id} className="mt-8">
                <AspectRatio
                  ratio={16 / 9}
                  className="overflow-hidden bg-background/10"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt ?? ""}
                    fill
                    sizes="(max-width: 900px) 100vw, 1440px"
                    className="object-cover"
                  />
                  {item.badge && (
                    <Badge variant="secondary">
                      <span
                        className="size-1.5 rounded-full bg-highlight"
                        aria-hidden
                      />
                      {item.badge}
                    </Badge>
                  )}
                  {item.callout && (
                    <div className="absolute bottom-5 left-5 bg-secondary px-5 py-3 text-foreground">
                      {item.callout}
                    </div>
                  )}
                </AspectRatio>

                {(item.footerText || item.actions) && (
                  <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-6 max-[700px]:grid-cols-1 max-[700px]:items-start">
                    {item.footerText && (
                      <Body size="compact" className="text-background/70">
                        {item.footerText}
                      </Body>
                    )}
                    {item.actions && (
                      <div className="flex flex-wrap items-center gap-3 max-[700px]:w-full">
                        {item.actions}
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </div>
        </Container>
      </Section>
    </Tabs>
  );
}
