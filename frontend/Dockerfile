# Usa uma imagem base oficial do Node.js para a fase de construção
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração do projeto e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Constrói a aplicação Next.js para produção
# Define a variável de ambiente para o build, apontando para o serviço backend no Docker Compose
ENV NEXT_PUBLIC_API_URL=http://backend:3000
RUN npm run build

# --- Fase de Execução ---
# Usa uma imagem Node.js menor e mais segura para servir a aplicação
FROM node:20-alpine AS runner

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários da fase de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expõe a porta em que a aplicação Next.js irá rodar
EXPOSE 3001

# Comando para iniciar a aplicação Next.js em modo de produção
CMD ["npm", "run", "start"]
