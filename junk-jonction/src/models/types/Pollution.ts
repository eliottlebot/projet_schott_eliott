export interface Pollution {
  id: number;
  titre: string;
  description: string;
  dateObservation: Date;
  typePollution: string;
  lieu: string;
  latitude: number;
  longitude: number;
  photo?: string;
  createdBy?: string;
  user?: { nom: string; prenom: string };
}
