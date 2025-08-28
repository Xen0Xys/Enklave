# Frontend AGENTS.md

This file provides specific guidance for the `frontend` project.

## Project Overview

The `frontend` is a [Nuxt](https://nuxt.com/) application (using Vue.js) that serves as the web client for Enclave. It is also wrapped with [Tauri](https://tauri.app/) to create a cross-platform desktop application.

## Getting Started

- **For web development:** Run the following command from the monorepo root to start the Nuxt development server.
    ```bash
    bun dev --filter frontend
    ```
- **For desktop development (Tauri):** To launch the desktop application in development mode.
    ```bash
    bun tauri dev --filter frontend
    ```

## Building

- **For the web:**
    ```bash
    bun build --filter frontend
    ```
- **For desktop (Tauri):**
    ```bash
    bun tauri build --filter frontend
    ```

## Code Structure

- **Nuxt (Web):**
    - `pages/`: The application's pages and file-based routing.
    - `components/`: Reusable Vue components.
    - `composables/`: Reusable functions (hooks) from the Vue Composition API.
    - `stores/`: Pinia state stores for global state management.
    - `layouts/`: Application layouts.
- **Tauri (Desktop):**
    - `src-tauri/`: Contains the Rust code for the desktop application. Changes here require a rebuild of the Tauri application.

## Styling

The project uses [shadcn-vue](https://www.shadcn-vue.com/) for UI components and [Tailwind CSS](https://tailwindcss.com/) for styling. Custom components are located in `components/ui`.
