FROM node:12.13.0

# Avoids verbose output of npm
ENV NPM_CONFIG_LOGLEVEL=warn

# Indicates that we are running our blog in dev mode
ENV NODE_ENV=development

# Resolves some HMR issues I was having
ENV GATSBY_WEBPACK_PUBLICPATH=/

# Chokidar is used to watch file changes and reload our
# app when needed. This env var enables the pooling to do so.
ENV CHOKIDAR_USEPOLLING=1

WORKDIR /app

COPY ./package*.json ./

RUN npm install -g gatsby-cli gatsby yarn --unsafe-perm && \
    yarn install && yarn cache clean

COPY . .

EXPOSE 8000

CMD ["yarn", "develop", "-H", "0.0.0.0" ]
