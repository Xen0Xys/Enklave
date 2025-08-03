FROM oven/bun:1-alpine AS base

WORKDIR /usr/src/app

# Build
FROM base AS build

COPY package.json ./

RUN bun install

COPY . .

RUN bun run build

# Run
FROM base AS run

USER bun

ENV NODE_ENV=PRODUCTION
ENV HOST 0.0.0.0

EXPOSE 3000

COPY --chown=bun:bun --from=build /usr/src/app/.output /usr/src/app/.output

CMD ["node", ".output/server/index.mjs"]
