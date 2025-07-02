# Weather Forecast App

Una aplicación fullstack que muestra el pronóstico del tiempo, construida con Remix.js y .NET Web API.

## Arquitectura

El proyecto está compuesto por tres servicios principales:

- **Frontend**: Aplicación Remix.js que provee la interfaz de usuario
- **Backend**: API REST construida con .NET 9
- **Database**: PostgreSQL para almacenamiento de datos

## Requisitos Previos

- Docker
- Docker Compose
- Node.js 20+ (para desarrollo)
- .NET 9 SDK (para desarrollo)

## Inicio Rápido

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd proyecto-remix-azure
```

2. Iniciar los servicios con Docker Compose:
```bash
docker compose up -d
```

Los servicios estarán disponibles en:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Base de datos: localhost:5432

## Estructura del Proyecto

