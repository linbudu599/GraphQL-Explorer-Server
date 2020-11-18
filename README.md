# GraphQL-Explorer

This is a demo which contains GraphQL and framework based on it(or work with it perfectly), including these for now:

- TypeGraphQL
- Apollo-Client & React & Parcel
- Apollo-Server
- TypeORM + SQLite3
- TypeStack Product

## Progress: 50%

see [docs](docs/README.md) for API will be used in this demo.

## Explore

```bash
npm install
npm run dev
# or use 2 terminals
npm run dev:client
npm run dev:server
```

## Script

- `dev`: `dev:client` + `dev:server`
- `dev:client`: develop client application
- `dev:server`: develop server
- `test:client`: invoke test cases in client
- `build:client`: build client application by Parcel
- `clean:server`: clear `tsc` compile file in server
- `start:server`: run in prod by nodemon
- `compile:server`: compile server code
- `pm2:dev`: run in prod by PM2(fork mode)
- `pressure-test`: run pressure test to server, see[pressure-fork.js](./pt-fork.js) & [pressure-main.js](./pt-main.js)

## Document

see offcial docs for more information.

- [Apollo-GraphQL](https://www.apollographql.com/docs/)
- [TypeGraphQL](https://typegraphql.com/)
- [TypeStack](https://github.com/typestack)
- [TypeORM](https://github.com/typeorm)
