FROM node:10.16.2-alpine

RUN apk update
RUN apk add bash
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
COPY . /app
RUN yarn install

ENV NODE_ENV production
ARG DB_HOST
ENV DB_HOST=$DB_HOST
ENV PORT=8000

CMD yarn start-prod
EXPOSE 8000