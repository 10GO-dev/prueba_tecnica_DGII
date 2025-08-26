# Prueba Técnica DGII

Aplicación de ejemplo para gestionar contribuyentes y comprobantes. Proyecto full‑stack con:

- Backend: ASP.NET Core (API REST) + EF Core + SQLite
- Frontend: React (Vite) + Tailwind CSS

Este README explica la arquitectura, cómo ejecutar en desarrollo y en producción (Docker), los endpoints disponibles y notas útiles para desarrolladores.

## Estructura del repositorio

- `backend/` — API en C# (Program.cs, Controllers, Data, Repositories, Services). Incluye pruebas unitarias en `PruebaTecnica.DGII.Tests/`.
- `frontend/` — aplicación React con Vite, componentes en `src/components`, utilidades en `src/api.js` y `src/constants.js`.
- `docker-compose.yml` — orquesta frontend (nginx) y backend.

## Requisitos

- .NET SDK (8.0/9.0 compatible)
- Node.js 18+ y npm
- Docker & Docker Compose (opcional)

## Ejecutar en desarrollo

### Backend

1. Abrir terminal en `backend`:

```powershell
cd .\backend\
dotnet build
dotnet watch run --urls http://0.0.0.0:5000
```

2. Swagger UI disponible en: `http://localhost:5000/swagger`

Notas:
- El proyecto asegura la creación de la base de datos SQLite (`prueba_tecnica.db`) y carga datos semilla al arrancar.
- Si `dotnet build` falla por un archivo bloqueado, detén el proceso que usa el exe (p. ej. una instancia previa de `dotnet watch`).

### Frontend

1. Abrir terminal en `frontend`:

```pwsh
cd .\frontend\
npm install
npm run dev
```

2. Abre la URL que muestre Vite (por defecto `http://localhost:5173`).

El frontend hace peticiones a `/api/*`. Si el backend está en `localhost:5000`, las llamadas funcionarán siempre que el navegador permita la comunicación (misma máquina). En producción, el Nginx del contenedor proxifica `/api` al servicio `backend`.

## Ejecutar con Docker (producción básica)

Desde la raíz del proyecto:

```pwsh
docker compose up --build
```

Esto construye las imágenes (frontend build con Node + Nginx) y levanta los servicios.

Nota: el Dockerfile del frontend usa `npm install --legacy-peer-deps` para evitar problemas de lockfile en la imagen. Lo ideal es mantener `package-lock.json` actualizado en el repositorio.

## Endpoints principales

- `GET /api/contribuyentes` — lista todos los contribuyentes.
- `GET /api/contribuyentes/{rnc}/comprobantes` — devuelve `{ contribuyente, comprobantes, totalItbis }`.


## Tests

Desde `backend` puedes ejecutar las pruebas unitarias:

```pwsh
cd D:\Programing\prueba_tecnica_DGII\backend
dotnet test
```

Se incluyen pruebas para servicios (cálculo de ITBIS y repositorios).

## Notas de diseño y decisiones importantes

- ITBIS: calculado como `monto * 0.18` redondeado a 2 decimales en frontend y backend.
- Manejo global de excepciones: existe un middleware que devuelve `ProblemDetails` en `application/problem+json` con `traceId` y detalle cuando está en Development.
- Frontend:
	- `src/api.js` centraliza las llamadas a la API.