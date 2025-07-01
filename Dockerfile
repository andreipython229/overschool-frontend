# Build stage
FROM node:20-alpine
WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 500000
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "yarn build && yarn serve"]