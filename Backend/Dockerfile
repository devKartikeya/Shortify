FROM node:22

WORKDIR /shoritfy

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]