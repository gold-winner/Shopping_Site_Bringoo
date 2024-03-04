FROM node:16-alpine as build
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn run swaggen
RUN yarn run build


FROM nginx:alpine
COPY --from=build /app/dist/bringoo-webshop /usr/share/nginx/html/bringoo-webshop
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
