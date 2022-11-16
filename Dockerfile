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
FROM httpd:2.4
WORKDIR /usr/local/apache2
# copy custom apache config
COPY configs/httpd.conf ./conf/httpd.conf
# copy ssl keys
COPY --from=build-stage /app/keys ./conf
# import built files
COPY --from=build-stage /app/build ./htdocs

EXPOSE 80 443