FROM alpine:3.7 as frontend

RUN apk add --no-cache nodejs-npm git

ADD web /web
WORKDIR /web

RUN npm install
RUN npm run build

FROM microsoft/dotnet:2-sdk as backend

ADD api /api
COPY --from=frontend /web/dist /api/wwwroot

WORKDIR /api
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM microsoft/aspnetcore

WORKDIR /app
RUN mkdir -p /data

COPY --from=backend /api/out/ .

CMD dotnet api.dll