FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app/server

COPY package*.json ./
RUN npm ci --omit=dev

COPY index.js ./
COPY src ./src

EXPOSE 5000

CMD ["node", "index.js"]