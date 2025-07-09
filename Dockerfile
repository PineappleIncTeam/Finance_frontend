FROM node:20-alpine
WORKDIR /app
RUN npm install --global pm2
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN mkdir -p .storybook/public
RUN npm run build
RUN npm run build-sb
EXPOSE 3000 8080
USER node
CMD ["pm2-runtime", "ecosystem.config.ts"]
