FROM node:10.16.2-alpine

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
COPY . /app
RUN yarn install

ENV NODE_ENV production
ENV DB_HOST 172.17.0.2
ENV PORT=8000

CMD yarn start-prod
EXPOSE 8000