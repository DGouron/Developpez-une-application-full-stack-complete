# Choix Techniques

Ce document détaille les choix techniques effectués pour le développement de la partie front-end de notre application full-stack.

## Table des matières

- [Architecture](#architecture)
- [Stack technique](#stack-technique)
- [Gestion de l'authentification](#gestion-de-lauthentification)
- [Style et UI](#style-et-ui)
- [Sécurité](#sécurité)
- [Organisation du code](#organisation-du-code)

## Architecture

### Clean Architecture

L'application suit les principes de la Clean Architecture pour maintenir une séparation des préoccupations et faciliter la maintenance à long terme. Cette architecture est organisée en couches :

- **Présentation** : Composants UI, pages, design system
- **Application** : Services, guards, intercepteurs
- **Domaine** : Entités, types, modèles de domaine
- **Infrastructure** : Services d'API, stockage local

### Modularité

L'application est organisée en modules suivant la fonctionnalité :

- **Core** : Services essentiels, configuration, gardes et intercepteurs
- **Shared** : Composants réutilisables
- **Design System** : Éléments d'interface utilisateur communs
- **Pages** : Composants spécifiques aux pages

## Stack technique

### Frameworks et bibliothèques

- **Angular** : Framework front-end pour le développement d'applications web
- **RxJS** : Bibliothèque pour la programmation réactive
- **Tailwind CSS** : Framework CSS utilitaire pour le design
- **Karma/Jasmine** : Pour les tests unitaires

### Pourquoi Angular ?

Angular a été choisi pour les raisons suivantes :
- Architecture complète et structurée
- Typage fort avec TypeScript
- Écosystème riche et mature
- Support à long terme par Google
- Modèle de composant puissant
- Réactivité avec RxJS

## Gestion de l'authentification

### Stratégie d'authentification

L'application utilise une authentification basée sur les tokens JWT (JSON Web Tokens) :

1. L'utilisateur s'authentifie (login/register) et reçoit un token
2. Le token est stocké dans un cookie HTTP-only (plus sécurisé que le localStorage)
3. Le cookie est automatiquement envoyé avec chaque requête HTTP
4. L'AuthGuard protège les routes nécessitant une authentification

### Sécurité des tokens

Nous utilisons des cookies HTTP-only pour stocker les tokens JWT pour les raisons suivantes :
- Protection contre les attaques XSS (Cross-Site Scripting)
- Le token n'est pas accessible via JavaScript
- Transmission automatique avec chaque requête
- Gestion de l'expiration côté serveur

### Flux d'authentification

```
┌─────────┐     ┌──────────┐     ┌──────────┐
│ Formulaire │─────│ AuthService │─────│  API       │
└─────────┘     └──────────┘     └──────────┘
      │               │                │
      │   Credentials │                │
      │──────────────>│                │
      │               │   Credentials  │
      │               │───────────────>│
      │               │                │
      │               │  Cookie HTTP-only
      │               │<───────────────│
      │  Redirection  │                │
      │<──────────────│                │
      │               │                │
```

### Protection des routes

L'application utilise un AuthGuard pour protéger les routes qui nécessitent une authentification :
- Si l'utilisateur est authentifié, l'accès à la route est autorisé
- Sinon, l'utilisateur est redirigé vers la page d'accueil

## Style et UI

### Tailwind CSS

Tailwind CSS a été choisi comme framework CSS pour :
- Sa flexibilité et sa facilité d'utilisation
- Son approche "utility-first" qui permet un développement rapide
- Sa personnalisation facile
- Son excellent support pour le responsive design

### Design System

Nous avons développé un module de design system avec des composants réutilisables :
- Boutons
- Formulaires
- Champs de saisie
- Cartes
- Etc.

Cette approche permet de maintenir une cohérence visuelle dans toute l'application et facilite les modifications futures.

## Sécurité

### Prévention XSS

- Évitement de l'utilisation de `innerHTML` 
- Utilisation des mécanismes de binding sécurisés d'Angular
- Validation et assainissement des entrées utilisateur
- Stockage des tokens dans des cookies HTTP-only au lieu du localStorage

### Sécurisation des requêtes

- Utilisation de cookies HTTP-only pour l'authentification
- Activation de CORS avec une configuration stricte
- Validation des réponses
- Gestion des erreurs centralisée

### Validation des formulaires

- Validation côté client avec les validateurs Angular
- Validation personnalisée pour les mots de passe (Force du mot de passe)
- Messages d'erreur explicites pour guider l'utilisateur

## Organisation du code

### Structure des dossiers

```
app/
├── core/               # Services essentiels, configuration, gardes
├── design-system/      # Composants UI réutilisables
├── pages/              # Composants spécifiques aux pages
└── shared/             # Fonctionnalités partagées
```

### Conventions de nommage

- **Composants** : nom-fonctionnalité.component.ts
- **Services** : fonctionnalité.service.ts
- **Guards** : fonctionnalité.guard.ts
- **Intercepteurs** : fonctionnalité.interceptor.ts

### Design Patterns

- **Dependency Injection** : Utilisation intensive du système d'injection de dépendances d'Angular
- **Observable Pattern** : Utilisation de RxJS pour les flux de données
- **Singleton** : Services providedIn: 'root'
- **Repository** : Abstraction des appels API 