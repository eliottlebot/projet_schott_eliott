# API V2 - TypeScript, Express & Prisma

API RESTful complète avec TypeScript, Express et Prisma pour la gestion des pollutions et des utilisateurs.

## 🚀 Technologies

- **TypeScript** - Typage statique
- **Express** - Framework web
- **Prisma** - ORM moderne
- **PostgreSQL** - Base de données

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Les variables d'environnement sont déjà dans .env
# Vérifier que DATABASE_URL est correctement configuré

# Le client Prisma est déjà généré
# Si besoin, régénérer avec:
npm run prisma:generate
```

## 🏃 Démarrage

```bash
# Mode développement (avec hot reload)
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start

# Ouvrir Prisma Studio (interface graphique)
npm run prisma:studio
```

Le serveur démarre sur **http://localhost:3001**

## 📚 API Endpoints

### 🌍 Pollutions

#### Créer une pollution
```http
POST /api/pollutions
Content-Type: application/json

{
  "titre": "Déchets plastiques",
  "lieu": "Plage de Nice",
  "dateObservation": "2025-12-27T10:00:00Z",
  "typePollution": "Plastique",
  "description": "Nombreux déchets plastiques sur la plage",
  "latitude": 43.6952,
  "longitude": 7.2683,
  "photoUrl": "https://example.com/photo.jpg"
}
```

#### Récupérer toutes les pollutions
```http
GET /api/pollutions
```

#### Récupérer une pollution par ID
```http
GET /api/pollutions/:id
```

#### Mettre à jour une pollution
```http
PUT /api/pollutions/:id
Content-Type: application/json

{
  "titre": "Déchets plastiques (mis à jour)",
  "lieu": "Plage de Nice"
}
```

#### Supprimer une pollution
```http
DELETE /api/pollutions/:id
```

### 👥 Utilisateurs

#### Créer un utilisateur
```http
POST /api/users
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "login": "jdupont",
  "pass": "motdepasse123"
}
```

#### Récupérer tous les utilisateurs
```http
GET /api/users
```

#### Récupérer un utilisateur par ID
```http
GET /api/users/:id
```

#### Mettre à jour un utilisateur
```http
PUT /api/users/:id
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean-Michel",
  "login": "jmdupont"
}
```

#### Supprimer un utilisateur
```http
DELETE /api/users/:id
```

## 🔧 Structure du projet

```
api-v2/
├── prisma/
│   ├── schema.prisma           # Schéma de base de données
│   └── migrations/             # Migrations
├── lib/
│   └── prisma.ts              # Instance Prisma Client
├── src/
│   ├── controllers/           # Logique métier CRUD
│   │   ├── pollution.controller.ts
│   │   └── user.controller.ts
│   ├── routes/               # Définition des routes
│   │   ├── index.ts
│   │   ├── pollution.routes.ts
│   │   └── user.routes.ts
│   ├── middleware/           # Middleware Express
│   │   └── errorHandler.ts
│   ├── utils/               # Utilitaires
│   │   └── asyncHandler.ts
│   └── index.ts            # Point d'entrée serveur
├── .env                    # Variables d'environnement
├── package.json
├── tsconfig.json
└── nodemon.json
```

## 📝 Réponses API

Toutes les réponses suivent le format:

### Succès
```json
{
  "success": true,
  "data": { ... }
}
```

### Erreur
```json
{
  "success": false,
  "message": "Message d'erreur"
}
```

## 🔐 Sécurité

⚠️ **Note importante**: Cette version utilise des mots de passe en clair. Pour la production, il faut:
- Utiliser bcrypt pour hasher les mots de passe
- Implémenter JWT pour l'authentification
- Ajouter des validations plus strictes
- Implémenter un middleware d'authentification

## 🛠️ Commandes utiles

```bash
# Régénérer le client Prisma après modification du schema
npm run prisma:generate

# Créer une nouvelle migration
npm run prisma:migrate

# Ouvrir Prisma Studio
npm run prisma:studio

# Build TypeScript
npm run build

# Lancer en mode dev avec hot reload
npm run dev
```

## 📊 Modèles de données

### User (utilisateurs)
- `id`: String (CUID, clé primaire)
- `nom`: String (requis)
- `prenom`: String (optionnel)
- `login`: String (unique, requis)
- `pass`: String (requis)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Pollution (pollutions)
- `id`: Int (auto-increment, clé primaire)
- `titre`: String (requis)
- `lieu`: String (optionnel)
- `dateObservation`: DateTime (optionnel)
- `typePollution`: String (optionnel)
- `description`: String (optionnel)
- `latitude`: Float (optionnel)
- `longitude`: Float (optionnel)
- `photoUrl`: String (optionnel)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## 📄 License

ISC
