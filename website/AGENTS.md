# Website AGENTS.md

Ce fichier fournit des conseils spécifiques au projet `website`.

## Aperçu du projet

Le `website` est une application [Nuxt](https://nuxt.com/) (utilisant Vue.js) qui sert de site web public et de page de destination pour Enclave.

## Démarrage

Pour démarrer le serveur de développement, exécutez la commande suivante depuis la racine du monorepo :

```bash
bun dev --filter website
```

## Compilation

Pour compiler le site web pour la production, exécutez :

```bash
bun build --filter website
```

## Structure du code

- `pages/`: Les pages du site web. Le routage est basé sur la structure de ce répertoire.
- `components/`: Contient les composants Vue, avec une sous-catégorie `landing/` pour les composants spécifiques à la page d'accueil.
- `composables/`: Fonctions réutilisables (hooks) de Vue Composition API.
- `config/`: Fichiers de configuration spécifiques à l'application, comme `landing.ts`.

## Style

Le projet utilise [shadcn-vue](https://www.shadcn-vue.com/) pour les composants d'interface utilisateur et [Tailwind CSS](https://tailwindcss.com/) pour le style. Les composants personnalisés se trouvent dans `components/ui`.
