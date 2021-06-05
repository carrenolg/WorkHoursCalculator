# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.17.0-alpine as build-stage

WORKDIR /app

COPY ./app/package*.json /app/

RUN npm install

COPY ./app /app/

RUN npm run build

# satge 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:stable-alpine

COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Copy the default nginx.conf provided
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
