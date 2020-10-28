FROM node:lts

WORKDIR /app

RUN yarn global add @vue/cli

RUN sudo echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p

RUN chown node:node -R /app

USER node