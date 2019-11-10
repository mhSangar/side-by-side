---
title: Build your own blog and make it portable with Docker
date: "2019-11-10T12:00:00.666Z"
description: "Let me show you how I ended up with my personal blog. Using Gatsby and Netlify to build it and then Docker to be able to easily move it to another machine."
available: true
draft: true
---

Have you ever think about having your own blog? I have thought about writing lots of times, but having my own blog wasn't at the top of the list. The reason: there are many other platforms (DEV, Medium, etc.) to write on that have much more visibility than a personal blog.

However, the number of posts I have written on these platforms goes up to... Zero 😅 I never had the *need* to write. With a personal blog, that changes. Who's going to write in there if it's not you?

Last weekend I saw [this awesome tutorial of Dave Ceddia][1] and I gave it a try. As he promised, I ended up with a very decent blog in less than **10 minutes**. Even better than that, it was not (just) on my *localhost:whatever*; it was deployed on a publicly accessible URL **for free**. The tutorial uses *Gatsby*, of which I heard a lot about recently but I haven't had the opportunity to check, and *Netlify*, a place where you can deploy your site in a matter of seconds.

I was amazed that everything went so easy and when I realized, I had a blog 👏🏻 An empty blog, though. It was time to write my very first post!

*Yes, the one you are currently reading :)*

## Adding Docker to the mix

In my first attempt, I installed *Gatsby* locally following the tutorial, but having that package on my npm list was bugging me. I prefer not to mess my local installation with more and more packages, so I finally decided to move it to a container. This way, it gives me the opportunity to migrate the project to another machine (for me, the PC tower of my room) and set everything up fast and easy. Besides, I spent much less time on this than I expected... I had to make it a bit more difficult 🙄 Let's see how to do it!

## Installing Docker and Docker Compose

The best way to get everything ready with Docker in your machine is following the *Docker Docs*. First, we need to install [Docker][2], then install [Docker Compose][3] and finally set up your [Docker Hub account][4].

Once we have followed the docs, we can check that everything has been correctly installed with:

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

# VSCode debug ports
EXPOSE 9929 9230

CMD ["yarn", "develop", "-H", "0.0.0.0" ]
```

The whole Dockerfile would be as follows.

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

EXPOSE 8000 9929 9230

CMD ["yarn", "develop", "-H", "0.0.0.0" ]
```



## Compose it up!

## Conclusions

[1]: https://daveceddia.com/start-blog-gatsby-netlify/
[2]: https://docs.docker.com/install/linux/docker-ce/ubuntu/
[3]: https://docs.docker.com/compose/install/
[4]: https://docs.docker.com/docker-hub/
