FROM alpine:3.7

RUN apk add --no-cache nodejs-npm git

RUN mkdir /web
ADD web/package* /web/
WORKDIR /web

RUN npm install
ADD web /web

RUN npm run build

FROM pierrezemb/gostatic
COPY --from=0 /web/dist/ /srv/http

