# Octopod - Podcast Search Application

A full-stack application for searching Arabic podcasts using the iTunes API.

## Project Structure

- **Frontend**: Next.js application with Arabic UI
- **Backend**: NestJS-Fastify API with PostgreSQL database

## Features

- Search for podcasts using keywords
- Store search results in PostgreSQL database
- Clear database functionality to remove all stored podcasts
- Responsive UI with RTL support for Arabic content

## Quick Start

### Using Docker Compose (Recommended)

Run the entire application stack with a single command:

```bash
docker-compose up -d
```

This will start:
- Frontend on http://localhost:3000
- Backend API on http://localhost:3001
- PostgreSQL database on port 5432

### Manual Setup

#### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The API will be available at http://localhost:3001 with Swagger documentation at http://localhost:3001/api

#### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:3000

## API Endpoints

- `GET /podcasts/search?term=<search_term>` - Search for podcasts
- `GET /podcasts/all` - Retrieve all podcasts from the database
- `DELETE /podcasts/clear` - Clear all podcasts from the database

## Environment Variables

### Backend

| Variable     | Description               | Default     |
|-------------|---------------------------|------------|
| DB_HOST     | PostgreSQL host           | postgres   |
| DB_PORT     | PostgreSQL port           | 5432       |
| DB_USERNAME | PostgreSQL username       | postgres   |
| DB_PASSWORD | PostgreSQL password       | postgres   |
| DB_DATABASE | PostgreSQL database name  | octopod    |
| DB_SYNC     | Auto-sync database schema | true       |

### Frontend

| Variable              | Description         | Default              |
|----------------------|---------------------|----------------------|
| NEXT_PUBLIC_API_URL  | Backend API URL     | http://localhost:3001 |
