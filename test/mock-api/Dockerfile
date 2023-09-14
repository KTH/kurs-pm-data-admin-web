FROM kthregistry.azurecr.io/kth-nodejs-18:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "node", "server.js" ]