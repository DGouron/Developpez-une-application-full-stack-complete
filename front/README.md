# Application Front-end

Ce dépôt contient la partie front-end de notre application full-stack. L'application est construite avec Angular et utilise Tailwind CSS pour le style.

## Table des matières

- [Présentation](#présentation)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage du projet](#démarrage-du-projet)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Tests](#tests)
- [Bonnes pratiques](#bonnes-pratiques)
- [Choix techniques](#choix-techniques)

## Présentation

Cette application front-end sert d'interface utilisateur pour notre application full-stack. Elle permet aux utilisateurs de s'inscrire, se connecter et accéder à des contenus protégés.

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)
- Angular CLI (v14 ou supérieur)

## Installation

1. Clonez ce dépôt
2. Naviguez vers le dossier `front`
3. Installez les dépendances :

```bash
npm install
```

## Démarrage du projet

Pour démarrer l'application en mode développement :

```bash
ng serve
```

L'application sera accessible à l'adresse [http://localhost:4200](http://localhost:4200).

## Structure du projet

```
front/
├── src/
│   ├── app/
│   │   ├── core/               # Services, intercepteurs, gardes, configuration
│   │   │   ├── config/         # Configuration de l'application
│   │   │   ├── domain/         # Entités et types de domaine
│   │   │   ├── guards/         # Gardes pour la protection des routes
│   │   │   ├── interceptors/   # Intercepteurs HTTP
│   │   │   ├── models/         # Modèles de données
│   │   │   └── services/       # Services partagés
│   │   ├── design-system/      # Composants de design réutilisables
│   │   ├── pages/              # Composants de pages
│   │   │   ├── articles/       # Page des articles (protégée)
│   │   │   ├── home/           # Page d'accueil
│   │   │   ├── login/          # Page de connexion
│   │   │   └── register/       # Page d'inscription
│   │   └── shared/             # Composants, pipes, directives partagés
│   ├── assets/                 # Ressources statiques
│   └── environments/           # Configurations d'environnement
└── ...
```

## Fonctionnalités

- **Authentification** : Inscription et connexion des utilisateurs
- **Protection des routes** : Accès aux pages protégées uniquement pour les utilisateurs authentifiés
- **Stockage des tokens** : Gestion des tokens d'authentification pour maintenir la session
- **Interception HTTP** : Ajout automatique du token d'authentification aux requêtes API
- **Design responsive** : Interface utilisateur adaptée à tous les appareils grâce à Tailwind CSS

## Tests

Pour exécuter les tests unitaires :

```bash
ng test
```

Pour exécuter les tests end-to-end :

```bash
ng e2e
```

## Bonnes pratiques

Ce projet suit les bonnes pratiques suivantes :

- **Clean Architecture** : Séparation claire des responsabilités
- **Angular Style Guide** : Respect des conventions de codage Angular
- **Code Linting** : Utilisation d'ESLint et Prettier pour assurer la qualité du code
- **Sécurité** : Mise en œuvre de protections contre les attaques XSS et CSRF

## Choix techniques

Pour plus d'informations sur les choix techniques, référez-vous au fichier [TECHNICAL-CHOICES.md](./TECHNICAL-CHOICES.md). 