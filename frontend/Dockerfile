FROM node:20-alpine

COPY ./package.json ./app/package.json

WORKDIR /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "start"]