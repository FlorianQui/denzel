FROM node:latest

WORKDIR /usr/src/denzel

COPY . .

RUN npm install

EXPOSE 8080

RUN ["node", "sandbox.js"]