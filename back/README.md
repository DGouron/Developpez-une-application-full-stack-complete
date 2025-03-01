# API Backend

Ce dépôt contient la partie backend de notre application full-stack. Il s'agit d'une API RESTful construite avec Spring Boot.

## Table des matières

- [Présentation](#présentation)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage du projet](#démarrage-du-projet)
- [Structure du projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Tests](#tests)
- [Bonnes pratiques](#bonnes-pratiques)
- [Choix techniques](#choix-techniques)

## Présentation

L'API backend fournit les services nécessaires pour l'authentification des utilisateurs, la gestion des articles, des commentaires et d'autres fonctionnalités. Elle est conçue pour fonctionner avec une application frontend Angular.

## Prérequis

- Java 17+
- Maven 3.6+
- MySQL 8.0+

## Installation

1. Clonez ce dépôt
2. Naviguez vers le dossier `back`
3. Configurez votre base de données MySQL:
   - Créez une base de données nommée `mdd_api`
   - Assurez-vous que les identifiants dans `application.properties` correspondent à votre configuration

4. Exécutez la compilation avec Maven:

```bash
mvn clean install
```

## Démarrage du projet

Pour démarrer l'application en mode développement:

```bash
mvn spring-boot:run
```

L'API sera accessible à l'adresse [http://localhost:3002/api](http://localhost:3002/api).

La documentation Swagger est disponible à [http://localhost:3002/api/swagger-ui.html](http://localhost:3002/api/swagger-ui.html).

## Structure du projet

```
back/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/openclassrooms/mddapi/
│   │   │       ├── configuration/    # Configuration de l'application
│   │   │       ├── controllers/      # Contrôleurs REST
│   │   │       ├── dtos/             # Objets de transfert de données
│   │   │       ├── entities/         # Entités JPA
│   │   │       ├── filters/          # Filtres HTTP
│   │   │       ├── providers/        # Fournisseurs de services
│   │   │       ├── repositories/     # Repositories de données
│   │   │       ├── services/         # Services métier
│   │   │       └── utils/            # Classes utilitaires
│   │   └── resources/
│   │       └── application.properties # Configuration de l'application
│   └── test/                         # Tests unitaires et d'intégration
└── pom.xml                           # Configuration Maven
```

## API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription d'un nouvel utilisateur
- `POST /api/auth/login` - Connexion d'un utilisateur
- `POST /api/auth/logout` - Déconnexion d'un utilisateur
- `GET /api/auth/me` - Récupération des informations de l'utilisateur connecté

### Articles

- `GET /api/articles` - Récupération de tous les articles
- `GET /api/articles/{id}` - Récupération d'un article par son ID
- `POST /api/articles` - Création d'un nouvel article
- `PUT /api/articles/{id}` - Mise à jour d'un article
- `DELETE /api/articles/{id}` - Suppression d'un article

### Commentaires

- `GET /api/comments/article/{id}` - Récupération des commentaires d'un article
- `POST /api/comments` - Ajout d'un commentaire
- `DELETE /api/comments/{id}` - Suppression d'un commentaire
- `GET /api/comments/my-comments` - Récupération des commentaires de l'utilisateur connecté

### Thèmes

- `GET /api/themes` - Récupération de tous les thèmes

### Abonnements

- `GET /api/subscriptions` - Récupération des abonnements disponibles
- `POST /api/subscriptions` - Souscription à un abonnement
- `GET /api/subscriptions/{id}` - Récupération d'un abonnement par son ID

## Configuration

La configuration de l'application se trouve dans le fichier `src/main/resources/application.properties`. Voici les principales propriétés:

```properties
# Port du serveur
server.port=3002
server.servlet.contextPath=/api

# Configuration de la base de données
spring.datasource.url=jdbc:mysql://localhost:3306/mdd_api
spring.datasource.username=user_mdd
spring.datasource.password=12345@12345

# Configuration JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Configuration JWT
app.secret-key=0zKPaoJtItZ3S9eyOpyepIYJvrbDxv6jpQYpZGaMTHU=0zKPaoJtItZ3S9eyOpyepIYJvrbDxv6jpQYpZGaMTHU=
app.expiration-time=900000

# Configuration des cookies
app.cookie.domain=localhost
app.cookie.secure=false
```

## Tests

Pour exécuter les tests unitaires:

```bash
mvn test
```

## Bonnes pratiques

Ce projet suit les bonnes pratiques suivantes:

- **Clean Architecture** : Séparation des responsabilités en couches
- **REST** : Conception d'API RESTful
- **DTO Pattern** : Utilisation de DTOs pour les échanges de données
- **Spring Security** : Sécurisation de l'API avec JWT
- **Documentation API** : Documentation complète avec Swagger

## Choix techniques

Pour plus d'informations sur les choix techniques, référez-vous au fichier [TECHNICAL-CHOICES.md](./TECHNICAL-CHOICES.md). 