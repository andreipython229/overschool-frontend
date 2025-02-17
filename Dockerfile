FROM node:18-alpine
WORKDIR /code
COPY package.json yarn.lock /code/
RUN yarn install --frozen-lockfile
COPY . /code/
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s", "build"]