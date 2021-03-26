FROM node:15

WORKDIR /app
COPY . /app

# add environment variable here
# such as database host etc.
ENV key=value

RUN yarn run install
RUN yarn run build

CMD ["yarn", "start:prod"]
