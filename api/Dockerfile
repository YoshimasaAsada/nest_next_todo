FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli
# RUN npm i -g yarn
RUN yarn install
# RUN npm install

COPY . .

CMD ["npm", "run", "start"]