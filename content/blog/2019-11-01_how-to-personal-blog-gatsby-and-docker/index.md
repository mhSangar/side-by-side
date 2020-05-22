---
title: Build your own blog and make it portable with Docker
date: "2019-11-10T12:00:00.666Z"
description: "Let me show you how I ended up with my personal blog, with a taste of Gatsby and Docker."
available: true
draft: true
---

Have you ever thought about having your own blog? I have thought about writing lots of times, but having my own blog wasn't at the top of the list. The reason: there are many other platforms (DEV, Medium, etc.) to write on that have much more visibility than a personal blog.

However, the number of posts I have written on these platforms goes up to... Zero 😅 I never had the *need* to write. With a personal blog, that changes. Who's going to write in there if it's not you?

Last weekend I saw [this awesome tutorial of Dave Ceddia][1] and I gave it a try. As he promised, I ended up with a very decent blog in less than **10 minutes**. Even better than that, it was not (just) on my *localhost:whatever*; it was deployed on a publicly accessible URL **for free**. The tutorial uses *Gatsby*, of which I heard a lot about recently but I haven't had the opportunity to check, and *Netlify*, where you can deploy your site in a matter of seconds.

I was amazed that everything went so smoothly and when I realized, I had a blog 👏🏻 An empty blog, though. It was time to write my very first post!

*Yes, the one you are currently reading :)*

## Adding Docker to the mix

In my first attempt, I installed *Gatsby* locally following the tutorial, but having that package on my npm list was bugging me. I prefer not to mess my local installation with more and more packages so, I finally decided to move it to a container. This way, it allows me to migrate the project to another machine (for me, the PC tower of my room) and set everything up fast and easy. Besides, I spent much less time on this than I expected... I had to make it a bit more difficult 🙄

I must say that I'm not a Docker expert (to be honest, I'm very newbie 😅), so let me know if anything seems wrong for you! Follow the steps below or just [go directly to the result](#launch-your-app-locally). I recommend the long way, though.

## Installing Docker and Docker Compose

The best way to get everything ready with Docker in your machine is following the *Docker Docs*. First, we need to install [Docker][2], then install [Docker Compose][3] and finally set up your [Docker Hub account][4].

Follow the links and then check that everything has been correctly installed with:

```bash{outputLines: 2-3, 5-5}{promptUser: mhsangar}{promptHost: pop-os}
docker --version
Docker version 19.03.3, build a872fc2f86

docker-compose --version
docker-compose version 1.24.1, build 4667896b
```

## Writing the Dockerfile

A Dockerfile specifies what will be inside your container when it's executed. It consists of a list of commands that Docker executes to assemble the image of your container.

Docker images are created using a succession of layers that are built one on another. To define the base image from which our application build will start, we need the `FROM` command. As we want it easy, let's use the default LTS version of node (not alpine) at the time of writing.

```docker
FROM node:12.13.0
```

Now we define some environment variables with the `ENV` command to configure our deploy.

```docker
# Avoids verbose output of npm
ENV NPM_CONFIG_LOGLEVEL=warn

# Indicates that we are running our blog in dev mode
ENV NODE_ENV=development

# Resolves some HMR issues I was having
ENV GATSBY_WEBPACK_PUBLICPATH=/

# Chokidar is used to watch file changes and reload our
# app when needed. This env var enables the pooling to do so.
ENV CHOKIDAR_USEPOLLING=1
```

We should set the working directory of our app. Docker would create one by default if it's not set, but it's a good practice to set it explicitly.

```docker
WORKDIR /app
```

Next, we copy our `package.json` and `package-lock.json` to the working directory. As we set it before, we can refer to it with `./`.

```docker
COPY ./package*.json ./
```

Copying these files before running the `install` command, allow us to use Docker's cached layers. At each stage of the build, Docker will check if it has a cached layer for the current instruction. If our `package.json` files change, Docker will rebuild the layer, but if not, Docker will use the cached layer and will skip the reinstallation of our node modules (*a precious time, trust me*).

Now we can install gatsby and yarn globally and then install our dependencies. Consolidating both `RUN` commands into one allow us to reduce the number of layers of our container.

```docker
RUN npm install -g gatsby-cli gatsby yarn --unsafe-perm && \
    yarn install && yarn cache clean
```

Copy your code to the working directory of the container.

```docker
COPY . .
```

Finally, we expose the ports that our app will be using and then we launch the app with `CMD`.

```docker
# Port where our app will de published
EXPOSE 8000

CMD ["yarn", "develop", "-H", "0.0.0.0" ]
```

The whole Dockerfile (`Dockerfile`) would be as follows.

```docker
FROM node:12.13.0

ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV=development
ENV GATSBY_WEBPACK_PUBLICPATH=/
ENV CHOKIDAR_USEPOLLING=1

WORKDIR /app

COPY ./package*.json ./

RUN npm install -g gatsby-cli gatsby yarn --unsafe-perm && \
    yarn install && yarn cache clean

COPY . .

EXPOSE 8000

CMD ["yarn", "develop", "-H", "0.0.0.0" ]
```

## Compose it up!

One can launch a container from a Dockerfile directly on the command line, using `docker build` to create the image and then `docker run` to launch the container. However, these commands usually need many arguments, such as the build tag, the port forwarding, or the volume mounts. Writing them easily becomes boring after the second or the third time... And you hate it shortly after 😤

You can avoid this by using Docker Compose. Basically, it's a YAML file where you define the configuration of your container. It's very useful if your app is *composed* of different containers that need to be launched in order, each of them with a specific configuration. In our case, we're going to use it just because we're lazy 😅

Docker Compose files start defining the version it's going to use. Some statements in the file may differ between versions, so you must indicate the version it uses explicitly.

```yaml
version: '3'
```

After the **version** tag, it comes **services**, where you define the configuration for each container. Our only container will be `blog` and will use the Dockerfile on the same directory to *build* the image.

```yaml
services:
  blog:
    build:
      context: .
      dockerfile: Dockerfile
```

Our browser will need to access the container **port** where the app is published, so it has to be forwarded to another port on localhost. In this case, we are going to use the same port, allowing us to access our blog on http://localhost:8000.

```yaml
services:
  blog:
    ...
    ports:
      - "8000:8000"
```

Finally, we need to set up the [volumes][5] our app is going to use. Volumes are the way Docker persists the data. They don't increase the size of the container and exist outside the life cycle of the containers, which makes them a perfect choice to store our *node_modules* directory. Docker names the volume with a hash, making it unique... But also pretty difficult to identify for us, humans 🤖. Name it accordingly with a separate tag **volumes** at the end of the file.

On the other hand, to be able to take the advantage of the *Hot Module Reloading* (HMR) feature of Gatsby, we can mount our host directory of the blog to the container. This way, when we change a file in our local machine, changes are reflected in the container side and Gatsby reloads the website using HMR.

```yaml
services:
  blog:
    ...
    volumes:
      # node_modules volume
      - side-by-side-modules:/app/node_modules
      # bind mount of host's blog directory
      - .:/app

volumes:
  # name for node_modules volume
  side-by-side-modules:
```

The whole Docker Compose file (`docker-compose.yml`) would be as follows.

```yaml
version: '3'

services:
  blog:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - side-by-side-modules:/app/node_modules
      - .:/app

volumes:
  side-by-side-modules:
```

## Launch your app locally

After following the [tutorial of Dave Ceddia][1] along with mine, we should have a Gatsby project with a _Dockerfile_ and a _docker-compose.yml_, both located at the root of the project. We just need to launch the container with `docker-compose`, and then open http://localhost:8000 in our browser to see our app running!

```bash{outputLines: 1-1, 3-4}{promptUser: mhsangar}{promptHost: pop-os}
# starts the container
docker-compose up

# stops the container
docker-compose down
```

## Conclusion




## Por hacer

- Conclusiones. Decir que para escribir esto he tenido que acudir a los docs buscar información al respecto, con lo que he aprendido más sobre el tema. Perks of writing. Tema del blog en general.
- Conexion y explicar blog en intro.
- Preguntas de qué te ha parecido, qué hay que mejorar, qué opinas sobre la tecnología.

## Dudas


[1]: https://daveceddia.com/start-blog-gatsby-netlify/
[2]: https://docs.docker.com/install/linux/docker-ce/ubuntu/
[3]: https://docs.docker.com/compose/install/
[4]: https://docs.docker.com/docker-hub/
[5]: https://docs.docker.com/storage/volumes/
