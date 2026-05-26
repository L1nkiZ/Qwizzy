# Qwizzy

Application de quiz full-stack composée d'un backend Laravel, d'un frontend Nuxt 3 et d'une orchestration Docker.

## Table des matières

- [Structure du monorepo](#structure-du-monorepo)
- [Prérequis](#prérequis)
- [Installation rapide](#installation-rapide)
- [Docker Compose disponibles](#docker-compose-disponibles)
- [Services et accès](#services-et-accès)
- [Credentials](#credentials)
- [API — Endpoints REST](#api--endpoints-rest)
- [API — Endpoints SOAP](#api--endpoints-soap)
- [Tests](#tests)
- [Couverture de code](#couverture-de-code)
- [Monitoring](#monitoring)
- [CI/CD](#cicd)
- [Commandes utiles](#commandes-utiles)
- [Analyse REST vs SOAP](#analyse-rest-vs-soap)

---

## Structure du monorepo

```
Qwizzy/
├── .github/
│   └── workflows/
│       ├── backend-ci.yml   ← Tests, qualité, sécurité, build (Laravel)
│       └── frontend-ci.yml  ← Lint, typecheck, tests (Nuxt)
├── Qwizzy_API/              ← Backend Laravel 11 + PostgreSQL 16
├── Qwizzy_Front/            ← Frontend Nuxt 3 (Vue 3, TypeScript)
└── Qwizzy_Env/              ← Orchestration Docker Compose
```

**Stack :**

| Partie | Technologie |
|--------|-------------|
| Backend | Laravel 11 · PHP 8.2 · PostgreSQL 16 · Swagger/OpenAPI 3.0 |
| Frontend | Nuxt 3 · Vue 3 · TypeScript · Pinia · pnpm |
| DevOps | Docker · Prometheus · Grafana · GitHub Actions |

---

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) ≥ 24
- [Git](https://git-scm.com/)

---

## Installation rapide

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd Qwizzy
```

### 2. Configurer l'environnement backend

```bash
cp Qwizzy_API/.env.example Qwizzy_API/.env
```

> Le `.env.example` est préconfiguré pour Docker. Aucune modification n'est nécessaire pour un démarrage local.

### 3. Choisir un profil et démarrer

| Besoin | Commande |
|--------|----------|
| Backend seul (API + BDD + pgAdmin) | `cd Qwizzy_API && docker compose up -d` |
| Backend + monitoring | `cd Qwizzy_API && docker compose -f docker-compose.app.yml up -d` |
| Backend + Frontend | `cd Qwizzy_Env && docker compose -f docker-compose.back-front.yml up -d` |
| Stack complète | `cd Qwizzy_Env && docker compose -f docker-compose.yml up -d` |

---

## Docker Compose disponibles

### `Qwizzy_API/`

| Fichier | Services |
|---------|----------|
| `docker-compose.yml` | App Laravel · PostgreSQL · pgAdmin · Prometheus · Grafana |
| `docker-compose.app.yml` | App Laravel · PostgreSQL · pgAdmin |

### `Qwizzy_Env/`

| Fichier | Services |
|---------|----------|
| `docker-compose.back-front.yml` | App Laravel · PostgreSQL · Frontend Nuxt |
| `docker-compose.yml` | App Laravel · PostgreSQL · pgAdmin · Frontend Nuxt · Prometheus · Grafana |

---

## Services et accès

| Service | Port | URL |
|---------|------|-----|
| **Frontend Nuxt** | `3000` | http://localhost:3000 |
| **API Laravel** | `8000` | http://localhost:8000 |
| **Swagger REST** | `8000` | http://localhost:8000/api/documentation |
| **Swagger SOAP** | `8000` | http://localhost:8000/soap/documentation |
| **Métriques Prometheus** | `8000` | http://localhost:8000/api/metrics |
| **Couverture de code** | `8000` | http://localhost:8000/coverage/ |
| **pgAdmin** | `8080` | http://localhost:8080 |
| **PostgreSQL** | `5432` | `localhost:5432` |
| **Prometheus** | `9090` | http://localhost:9090 |
| **Grafana** | `4000` | http://localhost:4000 |

---

## Credentials

### Comptes applicatifs

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Utilisateur | `member@example.com` | `password` |
| Administrateur | `admin@example.com` | `password` |

### Infrastructure

| Service | Identifiant | Mot de passe | Info |
|---------|-------------|--------------|------|
| **pgAdmin** | `admin@qwizzy.com` | `admin` | http://localhost:8080 |
| **PostgreSQL** | `qwizzy_user` | `qwizzy_password` | Database : `qwizzy_api` |
| **Grafana** | `admin` | `admin` | http://localhost:4000 |

### Connexion pgAdmin (première utilisation)

1. Ouvrir http://localhost:8080 → se connecter avec `admin@qwizzy.com` / `admin`
2. Clic droit "Servers" → "Register" → "Server..."
   - **General** : Name = `Qwizzy DB`
   - **Connection** : Host = `db` _(pas `localhost`)_ · Port = `5432` · Database = `qwizzy_api` · Username = `qwizzy_user` · Password = `qwizzy_password`

---

## API — Endpoints REST

Tous les endpoints de liste supportent la pagination : `current_sort`, `current_sort_dir` (`asc`/`desc`), `per_page`.

```
GET /api/questions?current_sort=created_at&current_sort_dir=desc&per_page=20
```

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| **Difficulties** |||
| GET | `/api/difficulties` | Liste |
| POST | `/api/difficulties` | Créer |
| GET | `/api/difficulties/{id}/edit` | Obtenir pour édition |
| PUT | `/api/difficulties/{id}` | Modifier |
| DELETE | `/api/difficulties/{id}` | Supprimer |
| **Subjects** |||
| GET | `/api/subjects` | Liste |
| POST | `/api/subjects` | Créer |
| GET | `/api/subjects/{id}/edit` | Obtenir pour édition |
| PUT | `/api/subjects/{id}` | Modifier |
| DELETE | `/api/subjects/{id}` | Supprimer |
| **Question Types** |||
| GET | `/api/question-types` | Liste |
| POST | `/api/question-types` | Créer |
| GET | `/api/question-types/{id}/edit` | Obtenir pour édition |
| PUT | `/api/question-types/{id}` | Modifier |
| DELETE | `/api/question-types/{id}` | Supprimer |
| **Questions** |||
| GET | `/api/questions` | Liste |
| GET | `/api/questions/create` | Données pour créer |
| POST | `/api/questions` | Créer |
| GET | `/api/questions/{id}` | Afficher |
| GET | `/api/questions/{id}/edit` | Données pour éditer |
| PUT | `/api/questions/{id}` | Modifier |
| DELETE | `/api/questions/{id}` | Supprimer |
| **Answers** |||
| GET | `/api/answers` | Liste |
| **Quiz** |||
| POST | `/api/quizzes` | Créer un quiz |
| PUT | `/api/quizzes/{id}` | Modifier |
| DELETE | `/api/quizzes/{id}` | Supprimer |
| POST | `/api/quizzes/{id}/questions` | Ajouter des questions |
| **Import/Export** |||
| POST | `/api/import/questions` | Importer des questions |
| GET | `/api/export/questions` | Exporter les questions |

### Authentification Swagger

Cliquer sur **Authorize** et saisir `token123`.

---

## API — Endpoints SOAP

Testables depuis http://localhost:8000/soap/documentation

| Opération | Description |
|-----------|-------------|
| `GenerateQuiz` | Générer un quiz avec filtres optionnels |
| `SubmitQuizAnswers` | Soumettre les réponses et obtenir la correction |
| `GetUserQuizHistory` | Historique des quiz d'un utilisateur |
| `GetQuizLeaderboard` | Classement général (top scores) |

---

## Tests

### Backend (PHPUnit)

```bash
# Tous les tests
docker exec -it qwizzy_app php artisan test

# Avec détails
docker exec -it qwizzy_app php artisan test --testdox

# Test spécifique
docker exec -it qwizzy_app php artisan test --filter QuestionControllerTest
```

### Frontend (Vitest)

```bash
cd Qwizzy_Front
pnpm test run
```

---

## Couverture de code

```bash
# Générer le rapport HTML
docker exec -it qwizzy_app composer test:coverage

# Accéder au rapport
# http://localhost:8000/coverage/
```

Seuils : rouge < 50% · orange 50–90% · vert > 90%

---

## Monitoring

- **Grafana** : http://localhost:4000 (`admin` / `admin`) → dashboard *Qwizzy API Monitoring*
- **Prometheus** : http://localhost:9090

Métriques exposées sur `/api/metrics` : taux de requêtes, temps de réponse (P95/P99), codes HTTP, taux d'erreurs, taille des réponses.

### Rate Limiting

| Niveau | Limite | Portée |
|--------|--------|--------|
| Standard | 100 req/min | Toutes les routes API |
| Strict | 20 req/min | Opérations sensibles |
| Guest | 30 req/min | Utilisateurs non authentifiés |

---

## CI/CD

Les pipelines se déclenchent uniquement sur les fichiers modifiés dans le sous-projet concerné (filtrage par `paths`).

### `backend-ci.yml` — déclenché sur `Qwizzy_API/**`

| Job | Description |
|-----|-------------|
| **Tests** | PHPUnit avec PostgreSQL 16 en service |
| **Quality** | PHP CodeSniffer (PSR12) · Laravel Pint · PHPStan niveau 5 |
| **Security** | `composer audit` · TruffleHog · vérification config · Psalm |
| **Build** | Optimisation Laravel + build image Docker (master/develop/tags) |

Déclenché aussi chaque **lundi à 9h** (cron) pour l'audit sécurité.

### `frontend-ci.yml` — déclenché sur `Qwizzy_Front/**`

| Job | Description |
|-----|-------------|
| **Quality** | ESLint · TypeScript · Prettier |
| **Tests** | Vitest |

---

## Commandes utiles

### Docker

```bash
# Démarrer
docker compose up -d

# Arrêter
docker compose down

# Arrêter + supprimer les volumes
docker compose down -v

# Logs en temps réel
docker compose logs -f qwizzy_app

# Reconstruire
docker compose up -d --build
```

### Laravel (dans le conteneur)

```bash
# Shell
docker exec -it qwizzy_app bash

# Migrations
docker exec -it qwizzy_app php artisan migrate
docker exec -it qwizzy_app php artisan migrate:fresh  # ⚠️ remet à zéro la BDD

# Cache
docker exec -it qwizzy_app php artisan cache:clear
docker exec -it qwizzy_app php artisan config:clear
docker exec -it qwizzy_app php artisan route:clear

# Générer la documentation Swagger
docker exec -it qwizzy_app php artisan l5-swagger:generate
```

### Frontend

```bash
cd Qwizzy_Front

pnpm install          # Installer les dépendances
pnpm dev              # Serveur de développement (port 3000)
pnpm build            # Build de production
pnpm lint             # ESLint
pnpm typecheck        # TypeScript
pnpm format:check     # Prettier
pnpm test run         # Tests unitaires
```

---

## Analyse REST vs SOAP

Les endpoints REST délèguent la logique métier au `QuizGeneratorService`, ce qui garde les contrôleurs lisibles. Les endpoints SOAP regroupent tout dans la même méthode, ce qui génère du couplage et de la verbosité.

La documentation REST est auto-générée depuis les annotations des contrôleurs. La documentation SOAP nécessite une vue Blade dédiée.

Les réponses XML de SOAP sont plus difficiles à déboguer que le JSON. Les endpoints REST bénéficient aussi d'une authentification par token absente de la couche SOAP.

SOAP est typiquement utilisé dans des contextes bancaires ou legacy à haute criticité — Qwizzy n'en nécessite pas la complexité.
