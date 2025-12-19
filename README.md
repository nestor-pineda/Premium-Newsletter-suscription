# Premium Newsletter Subscription

This project is a premium newsletter subscription platform built with a modern tech stack.

## Project Structure

The project is divided into two main applications:

- **`backend/`**: A NestJS application handling the API, authentication, billing, and subscription logic.
- **`frontend/`**: A Next.js application providing the user interface.

## Prerequisites

- Node.js (Latest LTS recommended)
- Docker (for the database)

## Getting Started

### 1. Database Setup

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

### 2. Installation

Install dependencies for the root, backend, and frontend:

```bash
npm install
npm run install:all
```

### 3. Running the App

You can start both the backend and frontend simultaneously from the root directory:

```bash
npm run dev
```

- **Backend API**: `http://localhost:3000`
- **Frontend**: `http://localhost:3001` (Note: Next.js will automatically detect if port 3000 is busy and use the next available port)

### Alternative: Running Individually

If you prefer to run them separately:

**Backend:**
```bash
npm run start:backend
# OR
cd backend && npm run start:dev
```

**Frontend:**
```bash
npm run start:frontend
# OR
cd frontend && npm run dev
```

## MVP Plan

See [MVP_PLAN.md](./MVP_PLAN.md) for details on the project roadmap and features.
