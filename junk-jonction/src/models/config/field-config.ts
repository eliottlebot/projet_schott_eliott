export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'number';
  placeholder?: string;
  required?: boolean;
  options?: string[];
  default?: any;
  error?: string;
}

export const POLLUTION_FIELDS: FieldConfig[] = [
  {
    name: 'titre',
    label: 'Titre de la pollution',
    type: 'text',
    placeholder: 'Entrez le titre de la pollution',
    required: true,
    default: '',
    error: 'Le titre est requis',
  },
  {
    name: 'description',
    label: 'Description de la pollution',
    type: 'text',
    placeholder: 'Entrez une description',
    required: true,
    default: '',
    error: 'La description est requise',
  },
  {
    name: 'date_observation',
    label: "Date de l'observation",
    type: 'date',
    placeholder: "Entrez la date de l'observation",
    required: true,
    default: new Date(),
    error: 'La date est requise',
  },
  {
    name: 'type_pollution',
    label: 'Type de la pollution',
    type: 'select',
    required: true,
    options: ['Plastique', 'Chimique', 'Dépôt sauvage', 'Eau', 'Air', 'Autre'],
    default: 'Plastique',
    error: 'Le type de pollution est requis',
  },
  {
    name: 'lieu',
    label: 'Lieu de la pollution',
    type: 'text',
    placeholder: 'Entrez le lieu de la pollution',
    required: true,
    default: '',
    error: 'Le lieu est requis',
  },
  {
    name: 'latitude',
    label: 'Latitude de la pollution',
    type: 'number',
    placeholder: 'Entrez la latitude de la pollution',
    required: true,
    default: null,
    error: 'Entrez une latitude valide (exemple : 48.8566)',
  },
  {
    name: 'longitude',
    label: 'Longitude de la pollution',
    type: 'number',
    placeholder: 'Entrez la longitude de la pollution',
    required: true,
    default: null,
    error: 'Entrez une longitude valide (exemple : 2.3522)',
  },
  {
    name: 'photo_url',
    label: 'Photo de la pollution',
    type: 'text',
    placeholder: "Entrez l'url de la photo",
    required: false,
    default: '',
    error: '',
  },
];
