"use client";

import { useState } from "react";
import { Eyebrow, Headline, Body } from "@/components/ds";
import { SoumissionForm } from "./_components/soumission-form";
import { SoumissionSuccess } from "./_components/soumission-success";
import { SoumissionSummary } from "./_components/soumission-summary";
import { INITIAL_FORM, type SoumissionForm as Form } from "./_components/types";

export default function SoumissionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<Form>(INITIAL_FORM);

  if (submitted) {
    return <SoumissionSuccess tel={form.tel} />;
  }

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_380px] gap-y-10 px-[clamp(20px,4vw,56px)] pb-[120px] pt-14 [column-gap:64px] max-[1000px]:grid-cols-1 max-[700px]:gap-y-6 max-[700px]:px-[18px] max-[700px]:pb-[60px] max-[700px]:pt-7">
      <div className="col-span-full border-b border-border pb-8">
        <Eyebrow>Demande de soumission</Eyebrow>
        <Headline
          level="display"
          as="h1"
          className="mt-3 text-[clamp(40px,5.5vw,72px)] max-[700px]:text-[32px] leading-none"
        >
          Votre projet, chiffré sous 48h.
        </Headline>
        <Body size="default" tone="soft" className="mt-5 max-w-[720px]">
          Soumettez votre liste de modules et votre contexte. Un chef de projet
          vous contacte sous 24h pour planifier la prise de mesures, et vous
          recevez une soumission ferme, incluant panneaux, fillers, livraison
          et installation, sous 48h.
        </Body>
      </div>

      <SoumissionForm
        form={form}
        setForm={setForm}
        onSubmit={() => {
          setSubmitted(true);
          window.scrollTo(0, 0);
        }}
      />

      <SoumissionSummary />
    </div>
  );
}
