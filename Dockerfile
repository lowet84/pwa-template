FROM alpine:3.7

RUN apk add --no-cache nodejs-npm git

ADD web /web
WORKDIR /web

RUN npm install
RUN npm run build

FROM pierrezemb/gostatic
COPY --from=0 /web/dist/ /srv/http

