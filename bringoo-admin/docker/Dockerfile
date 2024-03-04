FROM node:16-alpine as build
ENV NODE_OPTIONS="--max_old_space_size=4096"
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY package.json .
COPY .yarn-cache .yarn-cache
COPY yarn.lock .
RUN echo 'yarn-offline-mirror ".yarn-cache/"' >> .yarnrc
RUN echo 'yarn-offline-mirror-pruning true' >> .yarnrc
RUN yarn install --frozen-lockfile --no-progress
COPY . .
COPY env.ci .env
RUN yarn build-prod

FROM nginx:alpine
COPY --from=build /app/dist/bringoo-admin /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
