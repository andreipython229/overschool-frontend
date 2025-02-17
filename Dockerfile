FROM node:18-alpine
WORKDIR /code
COPY package.json yarn.lock /code/
RUN yarn install --frozen-lockfile --network-timeout 500000
COPY . /code/