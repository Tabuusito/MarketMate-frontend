# Imagen base con Node.js 20
FROM node:20-slim as build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

# Serve Application using Nginx Server
FROM nginx
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html/
EXPOSE 80