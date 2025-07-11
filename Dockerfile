FROM node:20-alpine
WORKDIR /app
RUN npm install --global pm2
RUN npm install --global typescript
RUN apk add --no-cache sed
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN mkdir -p .storybook/public
RUN npm run build && npm run build-sb && tsc ecosystem.config.ts --skipLibCheck
RUN ["sh", "-c", "[ -f ecosystem.config.js ] && sed -i '1,2d;$d' ecosystem.config.js || echo 'File not found for deleting'"]
RUN ["sh", "-c", "[ -f ecosystem.config.js ] && sed -i '1s/.*/module.exports = {/' ecosystem.config.js || echo 'File not found for modification'"]
EXPOSE 3000 8080
USER node
CMD ["sh", "-c", "sleep 4 && pm2-runtime ecosystem.config.js"]
