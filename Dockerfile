FROM node:15

WORKDIR /app
COPY . /app

RUN yarn run install
RUN yarn run build

CMD ["yarn", "start"]
