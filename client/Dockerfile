FROM node:14 AS frontend

WORKDIR /app

COPY client/package*.json ./

RUN npm ci --production

COPY client/ ./

RUN npm run build

FROM nginx:alpine

COPY --from=frontend /app/build /usr/share/nginx/html

EXPOSE 80
