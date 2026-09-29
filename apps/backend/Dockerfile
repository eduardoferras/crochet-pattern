FROM node:24.21.0-alpine3.24 AS base

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
	NODE_ENV=production \
	CI=true \
	PNPM_HOME=/pnpm \
	PATH=/pnpm:$PATH

RUN corepack enable
WORKDIR /home/node/app

FROM base AS build

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=node:node apps/backend/package.json ./apps/backend/package.json
COPY --chown=node:node packages/ ./packages/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
	pnpm install --filter backend... --frozen-lockfile --prod=false --trust-lockfile

COPY --chown=node:node apps/backend/ ./apps/backend/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
	pnpm --filter backend build \
	&& pnpm deploy --filter backend --prod --legacy /prod/backend

FROM base AS runtime

WORKDIR /home/node/app/apps/backend

COPY --chown=node:node --from=build /prod/backend/package.json ./package.json
COPY --chown=node:node --from=build /prod/backend/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/app/apps/backend/dist ./dist
COPY --chown=node:node --from=build /home/node/app/apps/backend/public ./public

EXPOSE 3000

USER node

CMD ["node", "--enable-source-maps", "dist/server.js"]
