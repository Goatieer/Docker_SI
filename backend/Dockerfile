# Dockerfile pour le backend
FROM node:16

WORKDIR /app

COPY package.json ./
RUN npm install -g nodemon
RUN npm install express modbus-serial cors


COPY . .

EXPOSE 5001

CMD ["nodemon", "--legacy-watch", "app.js"]
