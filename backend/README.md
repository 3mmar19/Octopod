# Octopod Backend API

A NestJS-Fastify API for searching podcasts using the iTunes API and storing results in PostgreSQL.

## Features

- Search podcasts using the iTunes API
- Store search results in PostgreSQL database
- Cache results for repeated searches
- Swagger API documentation
- Dockerized application with PostgreSQL

## API Endpoints

- `GET /podcasts/search?term=<search_term>` - Search for podcasts

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Running with Docker

1. Build and start the containers:

```bash
docker-compose up -d
```

2. The API will be available at http://localhost:3001
3. Swagger documentation is available at http://localhost:3001/api

### Development Setup

1. Install dependencies:

```bash
npm install
```

2. Make sure you have PostgreSQL running locally or update the `.env` file with your database connection details.

3. Start the development server:

```bash
npm run start:dev
```

## Environment Variables

| Variable     | Description               | Default     |
|-------------|---------------------------|------------|
| DB_HOST     | PostgreSQL host           | postgres   |
| DB_PORT     | PostgreSQL port           | 5432       |
| DB_USERNAME | PostgreSQL username       | postgres   |
| DB_PASSWORD | PostgreSQL password       | postgres   |
| DB_DATABASE | PostgreSQL database name  | octopod    |
| DB_SYNC     | Auto-sync database schema | true       |

## Docker Compose Services

- **api**: NestJS application running on port 3001
- **postgres**: PostgreSQL database running on port 5432
