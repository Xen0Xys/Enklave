# Website AGENTS.md

This file provides specific guidance for the `website` project.

## Project Overview

The `website` is a [Nuxt](https://nuxt.com/) application (using Vue.js) that serves as the public website and landing page for Enclave.

## Getting Started

To start the development server, run the following command from the monorepo root:

```bash
bun dev --filter website
```

## Building

To build the website for production, run:

```bash
bun build --filter website
```

## Code Structure

- `pages/`: The pages of the website. Routing is based on the structure of this directory.
- `components/`: Contains Vue components, with a `landing/` sub-category for components specific to the homepage.
- `composables/`: Reusable functions (hooks) from the Vue Composition API.
- `config/`: Application-specific configuration files, like `landing.ts`.

## Styling

The project uses [shadcn-vue](https://www.shadcn-vue.com/) for UI components and [Tailwind CSS](https://tailwindcss.com/) for styling. Custom components are located in `components/ui`.
