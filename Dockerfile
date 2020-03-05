FROM node:latest

WORKDIR /
RUN npm i -g serve
COPY build /build
EXPOSE 80

CMD [ "serve", "-s", "build", "-l", "80" ]

