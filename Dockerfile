# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build

EXPOSE 3000

# Running the app
CMD [ "npm", "start" ]
