# 1. Build stage
FROM node:20-alpine AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar todo o restante do código
COPY . .

# Build Next.js com saída standalone
RUN npm run build

# 2. Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar apenas a pasta .next/standalone, package.json e node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Expor a porta que o Next.js usará
EXPOSE 3000

# Definir variáveis de ambiente (podem ser sobrescritas no Netlify)
ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}

# Rodar a aplicação
CMD ["node", "server.js"]
