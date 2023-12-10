FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN yarn add -D prisma
RUN yarn add @prisma/client

RUN yarn add @nestjs/config @nestjs/jwt @nestjs/passport
RUN yarn add cookie-parser csurf passport passport-jwt bcrypt class-validator
RUN yarn add -D @types/express @types/cookie-parser @types/csurf @types/passport-jwt @types/bcrypt
RUN yarn add class-transformer

RUN yarn install


COPY . .

CMD ["npm", "run", "start"]