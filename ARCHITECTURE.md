# Architecture Frontend - Monde de Dev

## Vue d'ensemble

Le projet frontend est construit avec Angular en suivant une architecture modulaire et orientée domaine. L'objectif est de maintenir un code propre, évolutif et facile à comprendre, tout en respectant les principes SOLID.

## Structure du projet

src/
├── app/
│ ├── core/ # Éléments essentiels et singleton
│ │ ├── config/ # Configuration globale
│ │ ├── domain/
│ │ │ ├── types/ # Types et interfaces métier
│ │ │ ├── entities/ # Entités métier immutables
│ │ │ └── value-objects/ # Objets valeur auto-validants
│ │ ├── infrastructure/ # Communication externe
│ │ │ └── adapters/ # Adaptateurs API
│ │ ├── interceptors/ # Intercepteurs HTTP
│ │ └── services/ # Services globaux
│ │
│ ├── features/ # Modules fonctionnels
│ │ └── [feature]/ # Un module par fonctionnalité
│ │ ├── components/ # Composants spécifiques
│ │ └── services/ # Services spécifiques
│ │
│ └── shared/ # Éléments réutilisables
├── components/ # Composants partagés
├── directives/ # Directives partagées
└── pipes/ # Pipes partagés

## Principes architecturaux

### Clean Architecture

- **Séparation des responsabilités** : Chaque module a une responsabilité claire et unique.
- **Dépendances orientées vers le domaine** : Les couches externes dépendent des abstractions définies dans le domaine.
- **Isolation du code métier** : Le code métier est encapsulé dans des entités et des objets valeur.

### Domain-Driven Design (DDD)

- **Types et entités** : Utilisation de types stricts et d'entités immutables pour représenter le domaine.
- **Value Objects** : Objets valeur pour encapsuler des concepts métier immuables et auto-validants.

## Conventions de nommage

- **Types et interfaces** : Préfixe `I` pour les interfaces (ex: `IUser`), `T` pour les types (ex: `TUserId`).
- **Fichiers** : Noms en kebab-case avec un suffixe descriptif (ex: `.entity.ts`, `.service.ts`).

## Gestion des données

- **Pas de DTOs** : Utilisation directe des interfaces TypeScript pour les réponses API.
- **Services** : Les transformations de données sont effectuées dans les services, qui retournent des Observables typés.

## Sécurité

- **Validation des entrées** : Les entrées utilisateur sont validées pour éviter les injections.
- **Protection CSRF** : Les requêtes sensibles sont protégées contre les attaques CSRF.
- **Sanitization** : Les données sont nettoyées avant d'être affichées dans les templates.

## Guidelines MVP

- **Simplicité** : Privilégier des solutions simples et efficaces.
- **Modularité** : Chaque fonctionnalité est encapsulée dans un module indépendant.
- **Tests** : Tests unitaires sur la logique critique, avec une couverture suffisante pour garantir la qualité.

## Évolution

L'architecture est conçue pour être évolutive, permettant d'ajouter facilement de nouvelles fonctionnalités et de s'adapter aux changements futurs sans compromettre la qualité du code.

