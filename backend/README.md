# Octopod Backend API 🚀

A high-performance NestJS-Fastify API for podcast search and management with PostgreSQL integration.

## ✨ Features

- **Fast Search**: iTunes API integration for comprehensive podcast discovery
- **Data Persistence**: PostgreSQL database for storing and caching results
- **Performance**: Fastify framework for optimal speed and low overhead
- **Documentation**: Auto-generated Swagger API documentation
- **Containerized**: Docker support for easy deployment
- **Type Safety**: Full TypeScript implementation with TypeORM

## 📡 API Endpoints

- `GET /podcasts/search?term=<search_term>` - Search for podcasts by keyword
- `GET /podcasts/all` - Retrieve all stored podcasts
- `DELETE /podcasts/clear` - Clear all podcasts from database

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

## 🔧 Configuration

Create a `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=octopod
DB_SYNC=true
```

## 🛠️ Tech Stack

- **Framework**: NestJS with Fastify adapter
- **Database**: PostgreSQL with TypeORM
- **Language**: TypeScript
- **Documentation**: Swagger/OpenAPI
- **External API**: iTunes Search API
- **Containerization**: Docker

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3001/api
- **API Base URL**: http://localhost:3001

## 🐳 Docker Services

- **Backend API**: Port 3001
- **PostgreSQL Database**: Port 5432
- **Auto-restart**: Enabled for development
