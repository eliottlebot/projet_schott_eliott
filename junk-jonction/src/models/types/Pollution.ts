export interface Pollution {
  id: number;
  titre: string;
  description: string;
  date_observation: Date;
  type_pollution: string;
  lieu: string;
  latitude: number;
  longitude: number;
  photo_url?: string;
}
