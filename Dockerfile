FROM node:16-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install
COPY . .

RUN npm run build
