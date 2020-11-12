FROM node:13.10-alpine

RUN apk update && apk add git

COPY ./dist ./package.json ./

CMD [ "yarn", "start" ]
