# Octopod Backend API 🚀

A high‑performance NestJS + Fastify service for podcast search and storage using PostgreSQL and the iTunes Search API.

## Folder Structure

```
backend/
├── Dockerfile
├── docker-compose.yml
├── nest-cli.json
├── package.json
├── tsconfig.json
└── src/
    ├── app.module.ts
    ├── main.ts
    └── podcasts/
        ├── podcasts.module.ts
        ├── controllers/
        │   └── podcast.controller.ts
        ├── services/
        │   ├── itunes-api.service.ts
        │   └── podcast.service.ts
        ├── dto/
        │   └── search-podcast.dto.ts
        └── entities/
            └── podcast.entity.ts
```

## Getting Started (Development)

- Install dependencies:
  ```bash
  npm install
  ```
- Start the dev server:
  ```bash
  npm run start:dev
  ```
- API base URL: http://localhost:3001
- Swagger docs: http://localhost:3001/api

## Environment Variables (.env)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=octopod
DB_SYNC=true
```

## Docker

- Use the root `docker-compose.yml` at the project root (`octopod/`) to run backend + database (and frontend) together.
- Backend service port: 3001

## API Endpoints

- `GET /podcasts/search?term=<search_term>` — Search podcasts via iTunes and store results
- `GET /podcasts/all` — Retrieve all stored podcasts
- `DELETE /podcasts/clear` — Clear all podcasts from the database
