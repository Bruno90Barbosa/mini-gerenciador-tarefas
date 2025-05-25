# Usa uma imagem base oficial do Node.js para a fase de construção
FROM node:20-alpine AS development

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de configuração do projeto e instala as dependências
COPY package*.json ./
RUN npm install

# Copia todo o código-fonte da aplicação
COPY . .

# Constrói a aplicação NestJS para produção
RUN npm run build

# --- Fase de Produção ---
# Usa uma imagem Node.js menor e mais segura para a execução final
FROM node:20-alpine AS production

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia apenas as dependências de produção e os arquivos de build da fase anterior
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist
COPY package*.json ./ # Necessário para o npm start

# Expõe a porta em que a aplicação NestJS irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "run", "start:prod"]
