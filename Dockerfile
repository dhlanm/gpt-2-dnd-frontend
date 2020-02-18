FROM node:latest

WORKDIR /
# RUN npm i -g pm2@3.5.1
RUN npm i -g serve
COPY build /build
EXPOSE 80

# CMD [ "pm2", "serve", "--spa", "build", "80" ]
CMD [ "serve", "-s", "build", "-l", "80" ]

# CMD [ "pm2", "logs"]
