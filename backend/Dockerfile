# Base Image
FROM node:lts-alpine AS base
WORKDIR /app
COPY package*.json ./

# Stage 1: Development image 
FROM base AS development
RUN npm install
COPY . .
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Stage 2: Build the the application
FROM base AS build
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 3: Production image 
FROM node:lts-alpine AS production
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
RUN npm ci --production

ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT npm start
