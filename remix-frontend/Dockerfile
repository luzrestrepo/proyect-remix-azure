# Etapa de build
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa de producción
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "run", "start"]
