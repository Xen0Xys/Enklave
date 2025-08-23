# Backend AGENTS.md

Ce fichier fournit des conseils spécifiques au projet `backend`.

## Aperçu du projet

Le `backend` est une application [NestJS](https://nestjs.com/) qui sert d'API pour l'application Enclave. Il utilise [Prisma](https://www.prisma.io/) comme ORM pour interagir avec la base de données.

## Démarrage

Pour démarrer le serveur de développement, exécutez la commande suivante depuis la racine du monorepo :

```bash
bun dev --filter backend
```

## Base de données

Le projet utilise Prisma pour la gestion de la base de données.

- **Appliquer les migrations :** Pour appliquer les migrations de base de données, exécutez :
    ```bash
    bun prisma migrate dev --filter backend
    ```
- **Générer le client Prisma :** Après avoir modifié le fichier `schema.prisma`, vous devez régénérer le client Prisma :
    ```bash
    bun prisma generate --filter backend
    ```
- **Lancer Prisma Studio :** Pour visualiser et modifier les données dans la base de données, utilisez Prisma Studio :
    ```bash
    bun prisma studio --filter backend
    ```

## Tests

- Pour exécuter les tests unitaires et d'intégration pour le backend, utilisez la commande suivante depuis la racine du monorepo :
    ```bash
    bun test --filter backend
    ```

## Structure du code

- Le code est organisé en modules NestJS dans le répertoire `src/modules`.
- Suivez les conventions et les meilleures pratiques de NestJS lors de l'ajout de nouvelles fonctionnalités.
- Les schémas de base de données se trouvent dans `prisma/schema.prisma`.
