FROM node:12.13.0

# avoid verbose in npm
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV=development
ENV GATSBY_WEBPACK_PUBLICPATH=/
ENV CHOKIDAR_USEPOLLING=1

WORKDIR /app

RUN npm install -g gatsby-cli gatsby yarn --unsafe-perm 

COPY ./package*.json ./
RUN yarn install && yarn cache clean

COPY . .

EXPOSE 8000
EXPOSE 9929
EXPOSE 9230

CMD ["yarn", "develop", "-H", "0.0.0.0" ]
