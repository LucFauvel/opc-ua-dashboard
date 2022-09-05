FROM node:16 as build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
COPY angular.json ./

RUN git config --global url.https://github.com/.insteadOf git://github.com/
RUN yarn install --immutable

COPY src ./src
RUN yarn run build

FROM nginx:latest

COPY --from=build /usr/src/app/dist/opc-ua-dashboard /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80