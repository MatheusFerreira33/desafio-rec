FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

# Gera o client para TS
RUN npx prisma generate

COPY . .

RUN npm run build

# 🔥 GERA NOVAMENTE PARA O RUNTIME FINAL
RUN npx prisma generate

CMD ["node", "dist/main.js"]