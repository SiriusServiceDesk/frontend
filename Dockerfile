FROM node:21.7.0-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install
COPY . .

RUN npm run build
