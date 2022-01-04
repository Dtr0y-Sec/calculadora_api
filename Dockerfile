FROM node:17.3.0-alpine as base

FROM base as build
RUN mkdir -p /application
WORKDIR /application
COPY . .
RUN npm config set unsafe-perm true
RUN npm install typescript@4.5.4 -g
RUN npm install --unsafe-perm
RUN tsc
RUN rm -rf Dockerfile
RUN rm -rf package-lock.json
RUN rm -rf package.json
RUN rm -rf tsconfig.json
RUN rm -rf src

EXPOSE 5000

CMD ["node", "lib/server/start.js"]
