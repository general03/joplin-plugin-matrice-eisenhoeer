FROM node:23

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn
CMD ["yarn", "start"]