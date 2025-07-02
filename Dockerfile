FROM node:latest
WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 500000
COPY . /code/
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s", "build", "-l", "3000"]