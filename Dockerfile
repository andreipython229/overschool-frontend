# Build stage
FROM node:latest
WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 500000
COPY . /code/
RUN yarn build
CMD ["yarn", "serve"]