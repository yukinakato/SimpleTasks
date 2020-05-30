FROM node:lts-alpine

COPY . /home/node/SimpleTasks
WORKDIR /home/node/SimpleTasks

RUN chown -R node:node /home/node/

RUN apk update && apk upgrade && apk add git

USER node
RUN npm install && npm update
CMD ["npm", "start"]
