FROM kthse/kth-nodejs:14.0.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "node", "server.js" ]