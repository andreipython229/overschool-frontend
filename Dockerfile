# Build stage
FROM node:latest
WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 500000
COPY . .
RUN yarn build
CMD ["yarn", "serve"]