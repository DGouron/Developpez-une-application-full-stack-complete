# Architecture Frontend - Monde de Dev

## Vue d'ensemble

Le projet frontend est construit avec Angular en suivant une architecture modulaire et orientée fonctionnalités. L'objectif est de maintenir un code propre, évolutif et facile à comprendre, tout en respectant les principes SOLID et en intégrant les principes de la Clean Architecture.

## Structure du projet

```
src/
├── app/
│   ├── core/                # Éléments essentiels et singleton
│   │   ├── config/          # Configuration globale
│   │   ├── domain/          # Domaine métier
│   │   ├── application/     # Logique d'application
│   │   ├── models/          # Modèles de données
│   │   ├── guards/          # Guards pour la sécurité des routes
│   │   ├── interceptors/    # Intercepteurs HTTP
│   │   └── services/        # Services globaux
│   │
│   ├── design-system/       # Système de design
│   │   ├── button/          # Composants bouton
│   │   ├── input/           # Composants input
│   │   ├── textarea/        # Composants textarea
│   │   ├── sheet/           # Composants sheet
│   │   ├── navigation-bar/   # Barre de navigation
│   │   └── ...              # Autres composants UI
│   │
│   ├── features/           # Modules fonctionnels
│   │   ├── home/           # Page d'accueil
│   │   ├── login/          # Authentification
│   │   ├── register/       # Enregistrement utilisateur
│   │   ├── articles/       # Gestion des articles
│   │   ├── themes/         # Gestion des thèmes
│   │   ├── account/        # Gestion du compte utilisateur
│   │   └── ...             # Autres fonctionnalités
│   │
│   └── shared/             # Éléments réutilisables
│       ├── components/     # Composants partagés
│       ├── directives/     # Directives partagées
│       └── pipes/          # Pipes partagés
│
├── assets/                 # Ressources statiques
│
└── styles/                 # Styles globaux et thèmes
```

## Principes architecturaux

### Clean Architecture

- **Séparation des responsabilités** : Chaque module a une responsabilité claire et unique.
- **Dépendances orientées vers le domaine** : Les couches externes dépendent des abstractions définies dans le domaine.
- **Isolation du code métier** : Le code métier est encapsulé dans des services et modèles appropriés.

### Architecture modulaire

- **Modules par fonctionnalité** : Chaque fonctionnalité est encapsulée dans son propre module.
- **Composants autonomes** : Les composants sont conçus pour être réutilisables et indépendants.
- **Design System** : Système de design centralisé pour assurer la cohérence visuelle.

## Composants Standalone

Le projet utilise des composants Angular standalone lorsque c'est approprié, comme on peut le voir dans le composant `CreateArticleComponent`. Cette approche permet:

- Une meilleure encapsulation
- Des imports plus clairs et directs
- Une réduction de la complexité des modules

## Gestion des données

- **Services** : Les services encapsulent la logique d'accès aux données et les transformations.
- **Reactive Forms** : Utilisation des formulaires réactifs pour la gestion des entrées utilisateur.
- **HTTP Client** : Communication avec l'API via le service HttpClient d'Angular.

## Sécurité

- **Guards** : Protection des routes avec des guards appropriés.
- **Interceptors** : Gestion des tokens d'authentification et des erreurs HTTP.
- **Validation des entrées** : Les entrées utilisateur sont validées pour éviter les injections.

## Styles et UI

- **Tailwind CSS** : Utilisation de Tailwind CSS pour les styles, comme indiqué dans tailwind.config.js.
- **Design System modulaire** : Les composants UI sont encapsulés dans un module design-system.

## Conventions de développement

- **TypeScript strict** : Utilisation stricte du typage pour réduire les erreurs à l'exécution.
- **Composants spécialisés** : Chaque composant a une responsabilité unique et claire.
- **Responsive Design** : Les composants sont conçus pour s'adapter à différentes tailles d'écran.

## Évolution

L'architecture est conçue pour être évolutive, permettant d'ajouter facilement de nouvelles fonctionnalités et de s'adapter aux changements futurs sans compromettre la qualité du code. 