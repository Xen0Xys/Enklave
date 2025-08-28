# Backend AGENTS.md

This file provides specific guidance for the `backend` project.

## Project Overview

The `backend` is a [NestJS](https://nestjs.com/) application that serves as the API for the Enclave application. It uses [Prisma](https://www.prisma.io/) as its ORM to interact with the database.

## Getting Started

To start the development server, run the following command from the monorepo root:

```bash
bun dev --filter backend
```

## Database

The project uses Prisma for database management.

- **Apply migrations:** To apply database migrations, run:
    ```bash
    bun prisma migrate dev --filter backend
    ```
- **Generate Prisma client:** After modifying the `schema.prisma` file, you need to regenerate the Prisma client:
    ```bash
    bun prisma generate --filter backend
    ```
- **Launch Prisma Studio:** To view and edit data in the database, use Prisma Studio:
    ```bash
    bun prisma studio --filter backend
    ```

## Testing

- To run unit and integration tests for the backend, use the following command from the monorepo root:
    ```bash
    bun test --filter backend
    ```

## Code Structure

- The code is organized into NestJS modules in the `src/modules` directory.
- Follow NestJS conventions and best practices when adding new features.
- Database schemas are located in `prisma/schema.prisma`.
