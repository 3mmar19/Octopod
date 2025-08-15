FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

<<<<<<< HEAD
<<<<<<< HEAD
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Debug: Print the API URL being used
RUN echo "Building with API URL: $NEXT_PUBLIC_API_URL"

=======
>>>>>>> parent of bbca116a (update readme and fix the backend)
=======
>>>>>>> parent of bbca116a (update readme and fix the backend)
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
