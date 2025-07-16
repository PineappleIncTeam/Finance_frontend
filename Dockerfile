FROM node:20-alpine
WORKDIR /app
RUN npm install --global pm2
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN mkdir -p .storybook/public
RUN npm run build
EXPOSE 3000 8080
USER node
CMD ["sh", "-c", "sleep 4 && pm2-runtime ecosystem.config.js"]
