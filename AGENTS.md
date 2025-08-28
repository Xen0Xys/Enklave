# Enclave AGENTS.md

This file provides guidance for AI coding agents working on the Enclave monorepo.

## Project Overview

Enclave is a secure messaging application. The project is a monorepo containing:

- `backend`: A NestJS application providing the API.
- `frontend`: A Nuxt (Vue.js) application for the web client, wrapped with Tauri for a desktop version.
- `website`: A Nuxt (Vue.js) application for the public website.

The project uses `bun` for package management and `turborepo` for monorepo management.

## Development Environment Setup

1.  **Install dependencies:**
    ```bash
    bun install
    ```
2.  **Start all applications in development mode:**
    ```bash
    bun dev
    ```

## Building and Testing

- **Build all packages:**
    ```bash
    bun build
    ```
- **Run tests for all packages:**
    ```bash
    bun test
    ```
- **Run linting for all packages:**
    ```bash
    bun lint
    ```

## Package Management

- To add a dependency to a specific package, use the `--filter` flag. For example, to add a dependency to the `backend`:
    ```bash
    bun add <package-name> --filter backend
    ```

## Pull Request Instructions

- **Title format:** `[<package-name>] <Title>` (e.g., `[frontend] Add new login page`)
- Ensure all tests and linting pass before submitting a PR.
- Update or add tests for any code changes.
