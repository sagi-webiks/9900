# Base Image
FROM node:lts-alpine AS base
WORKDIR /app
COPY package*.json ./

# Stage 1: Development Stage 
FROM base AS development
RUN npm install
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]

# Stage 2: Build Stage
FROM base AS build
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 3: Production Stage (Bitnami Nginx)
FROM bitnami/nginx:latest AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /opt/bitnami/nginx/conf/nginx.conf.template
COPY docker-entrypoint.sh /opt/bitnami/scripts/docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/opt/bitnami/scripts/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
