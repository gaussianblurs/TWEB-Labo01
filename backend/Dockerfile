FROM node:latest

WORKDIR ./

COPY package*.json ./

RUN npm run build

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
