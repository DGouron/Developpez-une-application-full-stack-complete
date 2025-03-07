# Choix Techniques - Backend

Ce document détaille les choix techniques effectués pour le développement de la partie back-end de notre application full-stack.

## Table des matières

- [Architecture](#architecture)
- [Stack technique](#stack-technique)
- [Gestion de l'authentification](#gestion-de-lauthentification)
- [Structure des données](#structure-des-données)
- [Sécurité](#sécurité)
- [Organisation du code](#organisation-du-code)
- [API](#api)

## Architecture

### Clean Architecture

L'application backend suit les principes de la Clean Architecture pour maintenir une séparation des préoccupations et faciliter la maintenance à long terme. Notre architecture est organisée en couches:

- **Controllers** : Point d'entrée de l'API, gestion des requêtes HTTP
- **Services** : Logique métier et orchestration des opérations
- **Repositories** : Accès aux données et persistance
- **Entities** : Modèles de domaine et objets métier
- **DTOs** : Objets de transfert de données pour les requêtes/réponses API

### Avantages de cette architecture

- Séparation claire des responsabilités
- Facilité de test unitaire
- Évolutivité et maintenabilité améliorées
- Indépendance des frameworks

## Stack technique

### Frameworks et bibliothèques

- **Spring Boot** : Framework Java pour le développement d'applications
- **Spring Data JPA** : Abstraction pour l'accès aux données
- **Spring Security** : Sécurisation de l'application
- **Spring MVC** : Framework web MVC
- **MySQL** : Système de gestion de base de données relationnelle
- **Hibernate** : ORM (Object-Relational Mapping)
- **Lombok** : Réduction du code boilerplate
- **JWT** : Authentification basée sur des tokens
- **Swagger/OpenAPI** : Documentation d'API

### Pourquoi Spring Boot ?

Spring Boot a été choisi pour les raisons suivantes:
- Configuration automatique et simplifiée
- Écosystème riche et mature
- Injection de dépendances puissante
- Support robuste pour les API RESTful
- Grande communauté et documentation abondante
- Intégration facile avec d'autres technologies
- Performance et scalabilité

## Gestion de l'authentification

### Stratégie d'authentification

L'application utilise une authentification basée sur les tokens JWT (JSON Web Tokens) stockés dans des cookies HTTP-only:

1. L'utilisateur s'authentifie (login/register) et reçoit un token JWT
2. Le token est stocké dans un cookie HTTP-only, inaccessible par JavaScript
3. Le token est automatiquement envoyé avec chaque requête HTTP
4. Une série de filtres de sécurité valident le token à chaque requête

### Sécurité des tokens

Nous utilisons des cookies HTTP-only pour stocker les tokens JWT pour les raisons suivantes:
- Protection contre les attaques XSS (Cross-Site Scripting)
- Le token n'est pas accessible via JavaScript dans le navigateur
- Transmission automatique avec chaque requête
- Contrôle des attributs du cookie (domaine, chemin, sécurité)

### Flux d'authentification

```
┌─────────────┐     ┌───────────────┐     ┌───────────────┐
│  Controller  │─────│  UserService   │─────│  JwtProvider  │
└─────────────┘     └───────────────┘     └───────────────┘
        │                   │                     │
        │  Credentials      │                     │
        │<──────────────────│                     │
        │                   │  Authentication     │
        │                   │<────────────────────│
        │                   │                     │
        │                   │  Generate Token     │
        │                   │─────────────────────>
        │                   │                     │
        │  Token + Cookie   │  Token              │
        │<──────────────────│<────────────────────│
        │                   │                     │
```

### JwtAuthenticationFilter

Un filtre personnalisé intercepte chaque requête pour:
1. Extraire le token JWT du cookie
2. Valider le token
3. Authentifier l'utilisateur dans le contexte de sécurité Spring
4. Autoriser ou rejeter la requête selon les permissions

## Structure des données

### Entités principales

- **User** : Gestion des utilisateurs et authentification
- **Article** : Articles et contenus
- **Comment** : Commentaires des utilisateurs
- **Theme** : Catégorisation des articles
- **Subscription** : Gestion des abonnements

### Relations entre entités

Les relations entre les entités sont modélisées avec JPA:
- Relations One-to-Many
- Relations Many-to-One
- Relations Many-to-Many

### Base de données

MySQL a été choisi comme système de gestion de base de données pour:
- Sa fiabilité et sa maturité
- Son support des transactions ACID
- Sa capacité à gérer efficacement les jointures relationnelles
- Sa large adoption dans l'industrie

## Sécurité

### Mesures de sécurité implémentées

- **Authentification JWT** : Tokens signés pour l'authentification
- **Cookies HTTP-only** : Protection contre les attaques XSS
- **Hachage des mots de passe** : BCrypt pour le stockage sécurisé
- **CORS configuré** : Protection contre les requêtes cross-origin non autorisées
- **Validation des entrées** : Protection contre les injections
- **Contrôle d'accès** : Autorisations basées sur les rôles

### Prévention des attaques CSRF

La combinaison de cookies HTTP-only avec un modèle de jetons JWT fournit une protection contre les attaques CSRF. Pour les environnements de production, la configuration suivante est recommandée:
- Attribut `Secure` activé pour les cookies (HTTPS uniquement)
- Attribut `SameSite` configuré sur "Strict" ou "Lax"
- Validation de l'origine des requêtes

## Organisation du code

### Structure des packages

```
com.openclassrooms.mddapi/
├── configuration/    # Configuration Spring et sécurité
├── controllers/      # Endpoints API REST
├── dtos/             # Objets de transfert de données
├── entities/         # Modèles de domaine
├── filters/          # Filtres HTTP personnalisés
├── providers/        # Fournisseurs de services
├── repositories/     # Accès aux données
├── services/         # Logique métier
└── utils/            # Classes utilitaires
```

### Conventions de nommage

- **Controllers** : Suffixe `Controller`
- **Services** : Suffixe `Service`
- **Repositories** : Suffixe `Repository`
- **Entities** : Noms significatifs sans suffixe
- **DTOs** : Suffixe `DTO` (Request/Response)

### Design Patterns

- **Dependency Injection** : Utilisation du framework Spring pour l'injection de dépendances
- **Repository Pattern** : Abstraction de l'accès aux données
- **Builder Pattern** : Construction d'objets complexes (via Lombok @Builder)
- **DTO Pattern** : Séparation des objets de transfert et des entités
- **Factory Pattern** : Création d'objets avec des dépendances complexes

## API

### Conception RESTful

L'API suit les principes REST:
- Utilisation appropriée des méthodes HTTP (GET, POST, PUT, DELETE)
- URL basées sur les ressources
- Stateless (sans état)
- Réponses avec des codes HTTP appropriés
- Utilisation cohérente des formats de données (JSON)

### Documentation API

L'API est documentée avec Swagger/OpenAPI:
- Documentation interactive disponible à `/api/swagger-ui.html`
- Descriptions des endpoints
- Schémas de requêtes et réponses
- Exemples d'utilisation
- Authentification et autorisations

### Gestion des erreurs

Un système cohérent de gestion des erreurs:
- Codes HTTP appropriés (400, 401, 403, 404, 500, etc.)
- Messages d'erreur descriptifs
- Formats de réponse d'erreur standardisés
- Logging des erreurs pour le débogage

### Pagination et filtrage

Les endpoints qui renvoient des collections supportent:
- Pagination des résultats
- Tri sur différents champs
- Filtrage par critères
- Recherche textuelle

Ces fonctionnalités sont implémentées via Spring Data JPA et des specifications personnalisées. 