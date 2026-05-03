import type { CSSProperties, ReactNode } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
  id?: string;
  children: ReactNode;
}

export function Section({ className, style, id, children }: Props) {
  return (
    <section className={className} style={style} id={id}>
      {children}
    </section>
  );
}
