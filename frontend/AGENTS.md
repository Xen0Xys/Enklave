# Frontend AGENTS.md

Ce fichier fournit des conseils spécifiques au projet `frontend`.

## Aperçu du projet

Le `frontend` est une application [Nuxt](https://nuxt.com/) (utilisant Vue.js) qui sert de client web pour Enclave. Il est également encapsulé avec [Tauri](https://tauri.app/) pour créer une application de bureau multiplateforme.

## Démarrage

-   **Pour le développement web :** Exécutez la commande suivante depuis la racine du monorepo pour démarrer le serveur de développement Nuxt.
    ```bash
    bun dev --filter frontend
    ```
-   **Pour le développement de bureau (Tauri) :** Pour lancer l'application de bureau en mode développement.
    ```bash
    bun tauri dev --filter frontend
    ```

## Compilation

-   **Pour le web :**
    ```bash
    bun build --filter frontend
    ```
-   **Pour le bureau (Tauri) :**
    ```bash
    bun tauri build --filter frontend
    ```

## Structure du code

-   **Nuxt (Web) :**
    -   `pages/`: Les pages de l'application et le routage basé sur les fichiers.
    -   `components/`: Composants Vue réutilisables.
    -   `composables/`: Fonctions réutilisables (hooks) de Vue Composition API.
    -   `stores/`: Magasins d'états Pinia pour la gestion de l'état global.
    -   `layouts/`: Mises en page de l'application.
-   **Tauri (Bureau) :**
    -   `src-tauri/`: Contient le code Rust pour l'application de bureau. Les modifications ici nécessitent une reconstruction de l'application Tauri.

## Style

Le projet utilise [shadcn-vue](https://www.shadcn-vue.com/) pour les composants d'interface utilisateur et [Tailwind CSS](https://tailwindcss.com/) pour le style. Les composants personnalisés se trouvent dans `components/ui`.

