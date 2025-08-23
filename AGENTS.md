# Enclave AGENTS.md

Ce fichier fournit des conseils aux agents de codage IA travaillant sur le monorepo Enclave.

## Aperçu du projet

Enclave est une application de messagerie sécurisée. Le projet est un monorepo contenant :

- `backend`: Une application NestJS fournissant l'API.
- `frontend`: Une application Nuxt (Vue.js) pour le client web, encapsulée avec Tauri pour une version de bureau.
- `website`: Une application Nuxt (Vue.js) pour le site web public.

Le projet utilise `bun` pour la gestion des paquets et `turborepo` pour la gestion du monorepo.

## Configuration de l'environnement de développement

1.  **Installer les dépendances :**
    ```bash
    bun install
    ```
2.  **Démarrer toutes les applications en mode développement :**
    ```bash
    bun dev
    ```

## Compilation et tests

- **Compiler tous les paquets :**
    ```bash
    bun build
    ```
- **Exécuter les tests pour tous les paquets :**
    ```bash
    bun test
    ```
- **Exécuter le linting pour tous les paquets :**
    ```bash
    bun lint
    ```

## Gestion des paquets

- Pour ajouter une dépendance à un paquet spécifique, utilisez l'indicateur `--filter`. Par exemple, pour ajouter une dépendance au `backend`:
    ```bash
    bun add <nom-du-paquet> --filter backend
    ```

## Instructions pour les Pull Requests

- **Format du titre :** `[<nom-du-paquet>] <Titre>` (par exemple, `[frontend] Ajout d'une nouvelle page de connexion`)
- Assurez-vous que tous les tests et le linting passent avant de soumettre une PR.
- Mettez à jour ou ajoutez des tests pour toute modification de code.
