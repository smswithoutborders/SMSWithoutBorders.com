# use node alpine as base image
FROM node:14-alpine as build-stage
# install system build dependencies
RUN apk add make
# import work files
WORKDIR /app
COPY . .
# build production files
RUN make build

# serve the build with apache
FROM httpd:latest

# import built files
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build-stage /app/build .

EXPOSE 80