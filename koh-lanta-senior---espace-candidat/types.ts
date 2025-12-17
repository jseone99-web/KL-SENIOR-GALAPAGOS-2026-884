export interface CandidateDossier {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  address: string;
  postalCode: string;
  profession: string;
  // Missing fields to be filled
  medicalStatus?: string;
  passportNumber?: string;
  dietaryRestrictions?: string;
  motivationLetter?: string;
  swimLevel?: 'Novice' | 'Intermédiaire' | 'Expert';
  emergencyContact?: string;
  doctorName?: string;
}

export enum AppState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  SUCCESS = 'SUCCESS'
}

export interface AiFeedback {
  score: number;
  advice: string;
}