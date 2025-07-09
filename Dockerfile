FROM node:20-alpine
WORKDIR /app
RUN npm install --global pm2
RUN npm install --global typescript
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN mkdir -p .storybook/public
RUN npm run build
RUN npm run build-sb
RUN tsc ecosystem.config.ts
EXPOSE 3000 8080
USER node
CMD ["pm2-runtime", "ecosystem.config.js"]
