import { CandidateDossier } from "./types";

export const MOCK_CANDIDATE: CandidateDossier = {
  id: "KL-SENIOR-2026-884",
  firstName: "Eric",
  lastName: "JUBAULT",
  age: 54,
  city: "Luynes",
  address: "35 rue André Malraux",
  postalCode: "37230",
  profession: "Chargé de projets ferroviaire",
  // Missing fields are undefined
};

// Le logo doit être placé dans le dossier /assets/ à la racine du projet
export const LOGO_URL = "/assets/logo.png";
