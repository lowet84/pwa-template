FROM alpine:3.7

RUN apk add --no-cache nodejs-npm git

RUN git clone https://github.com/lowet84/pwa-template
WORKDIR /pwa-template

RUN npm install
RUN npm run build

FROM pierrezemb/gostatic
COPY --from=0 /pwa-template/dist/ /srv/http

