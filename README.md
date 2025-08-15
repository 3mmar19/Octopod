# Octopod 🎧

A modern, responsive podcast search application with enhanced UI and pagination features.

## ✨ Features

- **Enhanced Search UI**: Professional podcast search with 3×5 grid layout
- **Smart Pagination**: Navigate through results with smooth animations
- **Responsive Design**: Optimized for all screen sizes with RTL Arabic support
- **Hover Effects**: Interactive cards with smooth transitions and shadows
- **Modern Architecture**: Next.js frontend with NestJS backend
- **Database Integration**: PostgreSQL for storing and managing podcast data
- **API Integration**: iTunes API for comprehensive podcast search

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

## 🔧 Configuration

### Environment Variables

Create `.env` files in both frontend and backend directories:

#### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=octopod
DB_SYNC=true
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: NestJS, Fastify, TypeORM
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **API**: iTunes Search API

## 📱 UI Features

- **Grid Layout**: 3 rows × 5 columns podcast display
- **Pagination**: Smooth navigation with 15 items per page
- **Hover Animations**: Scale, shadow, and transition effects
- **Arabic Support**: Full RTL layout and typography
- **Responsive**: Mobile-first design approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
