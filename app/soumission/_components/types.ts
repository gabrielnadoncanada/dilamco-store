export interface SoumissionForm {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  code_postal: string;
  type_projet: string;
  budget: string;
  timeline: string;
  notes: string;
}

export const INITIAL_FORM: SoumissionForm = {
  nom: "",
  prenom: "",
  email: "",
  tel: "",
  code_postal: "",
  type_projet: "cuisine",
  budget: "40-60k",
  timeline: "3-6mois",
  notes: "",
};
