FROM node:12.13.0

# avoid verbose in npm
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV=development
ENV GATSBY_WEBPACK_PUBLICPATH=/
ENV CHOKIDAR_USEPOLLING=1

WORKDIR /app

COPY ./package*.json ./

RUN npm install -g gatsby-cli gatsby yarn --unsafe-perm && \
    yarn install && yarn cache clean

COPY . .

EXPOSE 8000 9929 9230

CMD ["yarn", "develop", "-H", "0.0.0.0" ]
