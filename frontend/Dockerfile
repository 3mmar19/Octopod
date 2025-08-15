FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

# Install sharp for Next.js image optimization in production
RUN npm install
RUN npm install sharp

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Debug: Print the API URL being used
RUN echo "Building with API URL: $NEXT_PUBLIC_API_URL"

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

# Install sharp in production stage
RUN npm install sharp

COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
