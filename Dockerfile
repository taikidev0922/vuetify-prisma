FROM node

WORKDIR /workspace

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"]