FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build-typedoc
RUN npm run buildDocsEcosystem
RUN npm install --global pm2 http-server

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder . .

EXPOSE 8086
CMD ["pm2-runtime", "ecosystemDocsTD.config.js"]
