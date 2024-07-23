FROM node:20.15.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock

RUN npm install yarn

RUN yarn

COPY . .

RUN npm run build

CMD ['node', 'dist/main.js']