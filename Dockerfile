FROM node:22.4-slim
WORKDIR /app
COPY ./package.json ./
EXPOSE 3000
RUN npm install
COPY . .
RUN npm run build
RUN ls -l /app
CMD npm start