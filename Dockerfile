# ---------- Etapa 1: compilación de Angular con Node.js 20 ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# ---------- Etapa 2: servidor web Nginx ----------
FROM nginx:1.27-alpine

# Render inyecta la variable PORT; localmente se usa el puerto 80.
ENV PORT=80

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/lifegoals/browser /usr/share/nginx/html

EXPOSE 80
