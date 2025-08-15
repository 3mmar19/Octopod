FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built application from build stage
COPY --from=build /app/dist ./dist

# Copy environment files if they exist
COPY .env* ./

EXPOSE 3001

CMD ["node", "dist/main"]
