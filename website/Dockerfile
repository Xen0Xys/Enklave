FROM oven/bun:1-alpine AS base

WORKDIR /usr/src/app

# Build
FROM base AS build

RUN apk add --no-cache python3 make g++ sqlite-dev

COPY package.json ./

RUN npm_config_build_from_source=true bun install --frozen-lockfile

COPY . .

RUN bun run build

# Run
FROM base AS run

USER bun

ENV NODE_ENV=PRODUCTION
ENV HOST=0.0.0.0

EXPOSE 3000

COPY --chown=bun:bun --from=build /usr/src/app/.output /usr/src/app/.output

CMD ["bun", ".output/server/index.mjs"]
