# Movix 🎬

Movix est une application web React dédiée à la découverte de films et séries : tendances du moment, recherche, fiches détaillées, favoris, commentaires et recommandations personnalisées.

## 1) Cloner le projet depuis GitHub

```bash
git clone <URL_DU_REPO_GITHUB>
cd Movix
```

Exemple :

```bash
git clone https://github.com/<votre-org>/<votre-repo>.git
cd Movix
```

## 2) Installer les dépendances

```bash
npm install
```

## 3) Variables d'environnement

Créez un fichier `.env` (ou `.env.local`) à la racine du projet avec les clés suivantes :

```env
REACT_APP_API_KEY=your_tmdb_api_key
REACT_APP_BASE_URL=https://api.themoviedb.org/3
REACT_APP_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
REACT_APP_API_KEY_YOUTUBE=your_youtube_api_key
REACT_APP_JSON_API_URL=http://localhost:3001
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

> `REACT_APP_OPENAI_API_KEY` est utilisée par le composant AI Picks (fonctionnalité expérimentale).

## 4) Lancer le projet

### Option recommandée (front + API mock en même temps)

```bash
npm run go
```

- Front React : `http://localhost:3000`
- API mock (auth + données locales) : `http://localhost:3001`

### Option en 2 terminaux

Terminal 1 (front) :

```bash
npm start
```

Terminal 2 (API mock) :

```bash
npm run server
```

## 5) Fonctionnalités du site

- **Accueil / Dashboard personnalisé** : carrousel de recommandations selon les préférences utilisateur + section Trending.
- **Catalogue films** : navigation par catégories (Top Rated, Popular, Upcoming, Now Playing).
- **Catalogue séries TV** : liste des séries populaires.
- **Détails d’un film/série** : synopsis, genres, casting, vidéos trailer, suggestions similaires.
- **Recherche globale** : recherche multi-contenu (films, séries, personnes).
- **Favoris** : ajout/suppression et affichage des contenus favoris liés à l’utilisateur connecté.
- **Commentaires** : consultation/ajout de commentaires sur une fiche film/série (si connecté).
- **Authentification** : inscription/connexion via API mock avec token.
- **Paramètres utilisateur** : édition profil et préférences (genres) pour alimenter les recommandations.
- **Pages personnes** : listing des célébrités populaires + fiches détaillées.

## 6) Technologies utilisées

### Front-end

- **React 19** : UI et composants.
- **React Router DOM** : routage côté client.
- **Redux Toolkit + React Redux** : gestion de l’état global (favoris, commentaires, alertes, listes).
- **Axios** : requêtes HTTP (notamment API mock) avec interception du token d’auth.
- **Swiper** : carrousels (dashboard/recommandations).
- **Recharts** : visualisation de données (graphiques).
- **CSS** : styles applicatifs.

### Back-end local (mock)

- **Node.js + Express** : serveur API local.
- **json-server** : base JSON locale (`db.json`) exposée en API REST.
- **Authentification token maison (HMAC SHA256)** : endpoints `/register` et `/login` + protection de routes.

### APIs externes

- **TMDB API** : données films/séries/personnes.
- **YouTube Data API** : récupération de trailers.
- **OpenAI API** : essais de recommandations conversationnelles (AI Picks).

## 7) Librairies principales et rôle de chacune

- `react`, `react-dom` : rendu de l’application.
- `react-router-dom` : navigation SPA et paramètres d’URL.
- `@reduxjs/toolkit`, `react-redux` : store + slices d’état.
- `axios` : appels API avec intercepteur d’auth.
- `swiper` : sliders/carrousels.
- `recharts` : composants graphiques.
- `express` : serveur HTTP.
- `json-server` : mock API REST basé sur fichier JSON.
- `json-server-auth` : dépendance d’auth mock (présente dans le projet).
- `openai` : intégration IA potentielle côté app.
- `swagger-jsdoc`, `swagger-ui-express` : outillage de documentation API (dépendances disponibles).
- `loglevel` : logs client.
- `concurrently` : exécution simultanée front + API.
- `serve` : serveur statique pour build de production.

## 8) Routes principales (Front)

- `/` : dashboard.
- `/movies` : liste des films.
- `/movie-details/:id` : détails d’un film.
- `/favorites` : favoris utilisateur.
- `/tv-shows` : liste des séries.
- `/tv-details/:id` : détails d’une série.
- `/search/:query` : résultats de recherche.
- `/persons` : personnes populaires.
- `/person-details/:personId` : détails d’une personne.
- `/media-photos/:mediaType/:mediaId` : galerie photos d’un média.
- `/settings` : paramètres utilisateur.
- `/register` : inscription.
- `/login` : connexion.
- `*` : page Not Found.

## 9) Routes principales (API mock locale)

### Authentification

- `POST /register`
- `POST /login`

### Ressources protégées (Bearer token requis)

- `/users`
- `/favorites`
- `/comments`
- `/lists` (et `/list`)

## 10) Scripts npm utiles

- `npm start` : lance le front en développement.
- `npm run server` : lance l’API mock locale.
- `npm run go` : lance front + API en parallèle.
- `npm run build` : build de production.
- `npm run serve:prod` : sert le build React.
- `npm run server:prod` : lance l’API en mode prod local.
- `npm run go:prod` : lance front build + API prod local.
