
# Octopod Frontend 🎨

A modern, responsive Next.js frontend for the Octopod podcast search application with enhanced UI and smooth animations.

## ✨ Features

- **Enhanced Search Interface**: Professional podcast search with real-time results
- **3×5 Grid Layout**: Optimized display showing 15 podcasts per page
- **Smart Pagination**: Smooth navigation with hover effects and animations
- **Responsive Design**: Mobile-first approach with RTL Arabic support
- **Interactive Cards**: Hover effects with scale, shadow, and lift animations
- **Modern UI**: Clean design with Tailwind CSS and custom components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Create environment file:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with RTL support
│   ├── page.tsx            # Home page
│   └── search/
│       ├── page.tsx        # Search page with pagination
│       ├── loading.tsx     # Loading UI
│       └── error.tsx       # Error handling
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Spinner.tsx
│   ├── search/             # Search-specific components
│   │   ├── SearchBar.tsx   # Search input with clear button
│   │   └── ResultsGrid.tsx # Grid with pagination
│   ├── podcast/            # Podcast-related components
│   │   ├── PodcastCard.tsx # Interactive podcast cards
│   │   └── EpisodeCard.tsx # Compact episode cards
│   └── sidebar/            # Navigation components
│       └── Sidebar.tsx     # Main navigation
├── services/
│   └── api.ts              # API service functions
└── styles/
    └── globals.css         # Global styles and Tailwind
```

## 🎨 UI Components

- **PodcastCard**: Interactive cards with hover animations
- **EpisodeCard**: Compact episode display for grid layout
- **SearchBar**: RTL-supported search with clear functionality
- **Pagination**: Smooth navigation with Arabic text support
- **Sidebar**: Navigation with social links and animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Components**: Custom React components
- **Animations**: CSS transitions and transforms
- **Fonts**: Optimized web fonts

## 🌐 Deployment

The app can be deployed on any platform that supports Next.js:

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site deployment
- **Docker**: Containerized deployment
