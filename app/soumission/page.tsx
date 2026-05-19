"use client";

import { useState } from "react";
import { Container, Section, SectionHeading } from "@/components/ds";
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
    <>
      <Section density="compact" divider={false}>
        <Container>
          <SectionHeading
            className="max-w-4xl mr-auto"
            eyebrow="Demande de soumission"
            title="Votre projet, chiffré sous 48h."
            description="Soumettez votre liste de modules et votre contexte. Un chef de projet vous contacte sous 24h pour planifier la prise de mesures, et vous recevez une soumission ferme, incluant panneaux, fillers, livraison et installation, sous 48h."
          />
        </Container>
      </Section>
      <Section className="pt-0">
        <Container className="mx-auto grid grid-cols-[1fr_380px] gap-y-10 [column-gap:64px] max-[1000px]:grid-cols-1 max-[700px]:gap-y-6">
          <SoumissionForm
            form={form}
            setForm={setForm}
            onSubmit={() => {
              setSubmitted(true);
              window.scrollTo(0, 0);
            }}
          />

          <SoumissionSummary />
        </Container>
      </Section>
    </>
  );
}
