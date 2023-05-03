FROM node:18.12.1-alpine as development

# Create app directory
WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18.12.1-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/package.json .

CMD [ "node", "dist/main" ]
