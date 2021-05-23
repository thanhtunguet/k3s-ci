FROM node:13.10-alpine as build
WORKDIR /usr/src/
COPY package.json .
RUN yarn install --development
COPY . .
RUN yarn build

FROM build as final
WORKDIR /usr/app/
RUN apk update && apk add git
COPY --from=build /usr/src/dist /usr/src/package.json ./
CMD [ "yarn", "start" ]
