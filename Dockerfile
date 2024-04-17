FROM docker.io/library/node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM builder as production
COPY . .
RUN test -e /app/build && echo "Files exist" || echo "Files not found"
RUN npm run build

FROM docker.io/library/nginx:1.21.0-alpine
COPY --from=production /app/build /usr/share/nginx/html
