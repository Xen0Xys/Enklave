# Enklave

Enklave is a collaborative family and couple management software designed to simplify everyday life. It offers secure file and media storage, shared shopping lists, and notes, enabling seamless organization and sharing between family members or partners. With Enklave, you can centralize important documents, coordinate tasks, and keep everyone connected, whether at home or on the go.

## Project Structure

- **backend/**: NestJS (TypeScript) API with Fastify, Prisma (PostgreSQL), authentication, file management, newsletters, and more.
- **frontend/**: Nuxt 4 (Vue 3) application for the user interface, packaged as a desktop app via Tauri.
- **website/**: Nuxt 4 (Vue 3) public website, static or SSR.

## Installation

1. **Install global dependencies**:
   ```bash
   bun install
   ```
2. **Install dependencies for each module**:
   ```bash
   cd backend && bun install
   cd ../frontend && bun install
   cd ../website && bun install
   ```

## Usage

### Backend (API)
- **Development**:
  ```bash
  cd backend
  bun run start:dev
  ```
- **Production**:
  ```bash
  bun run build
  bun run start:prod
  ```

### Frontend (Web/Desktop)
- **Web development**:
  ```bash
  cd frontend
  bun run dev
  ```
- **Desktop app (Tauri)**:
  ```bash
  bun run tauri:dev
  # For desktop build
  bun run tauri:build
  ```

### Website (Public)
- **Development**:
  ```bash
  cd website
  bun run dev
  ```
- **Static build**:
  ```bash
  bun run generate
  ```

## Database & Prisma

- **Migration**:
  ```bash
  cd backend
  bunx prisma migrate dev
  ```
- **Seed**:
  ```bash
  bun run prisma:seed
  ```

## Configuration

- Environment variables should be set in each folder (`.env`).
- Example for backend:
  ```env
  DATABASE_URL=postgresql://user:password@localhost:5432/enklave
  JWT_SECRET=...
  ```

## Development & Contribution

- **Lint**:
  ```bash
  bun run lint
  bun run lint:fix
  ```
- **Tests**:
  ```bash
  bun run test
  ```

## Deployment

- **Backend**: Docker, VPS, or any Node/Bun-compatible cloud.
- **Frontend**: Standard web deployment (Vercel, Netlify, etc.) or desktop build via Tauri.
- **Website**: Static or SSR deployment.

## License

This project is licensed under CC-BY-NC-ND.

## Author

Tom CZEKAJ aka Xen0Xys

---

For any questions or contributions, open an issue or pull request!
