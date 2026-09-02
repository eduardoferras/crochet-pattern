FROM node:24.19.0-alpine3.23

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN corepack enable
RUN corepack enable npm

WORKDIR /home/node/app

RUN chown -R node:node /home/node/app
USER node
