# REE Fullstack Project

This is a fullstack project that consumes the REE API to display energy consumption data with charts and card descriptions.

## Frontend

The frontend is built with React, using the Vite template. It is located in the `frontend/` directory.

### Front - Features

- Displays energy consumption data with charts
- Displays card descriptions for each energy consumption data point

### Run the frontend

1. `cd frontend/`
2. `pnpm install`
3. `pnpm dev`

## Backend

The backend is built with NestJS, using the NestJS CLI. It is located in the `backend/` directory.

### Back - Features

- Consumes the REE API to retrieve energy consumption data
- Exposes the energy consumption data as a REST API

### Run the backend

1. `cd backend/`
2. `pnpm install`
3. `pnpm run dev`

## Docker Compose

The project can be run with Docker Compose, using the `docker-compose.yml` file in the root directory.

### Run the project with Docker Compose

1. `docker-compose up`

This will start the frontend and backend containers, and make the frontend available at `http://localhost:3000`.
