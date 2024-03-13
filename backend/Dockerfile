FROM node:lts-buster-slim

WORKDIR /app
COPY . ./
RUN npm install
EXPOSE 5000
CMD [ "npm", "prod" ]
