# GraphQL-Explorer

[![Netlify Status](https://api.netlify.com/api/v1/badges/9b1032ca-eb12-4cfd-bfad-52da4b8b5451/deploy-status)](https://app.netlify.com/sites/linbudu-graphql-explorer/deploys)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/linbudu599/GraphQL-Explorer/GraphQL-Explorer-Client/master?label=GitHub%20Actions%20Client)
![Travis (.com)](https://img.shields.io/travis/com/linbudu599/GraphQL-Explorer?label=travis%20client)
![Codecov](https://img.shields.io/codecov/c/github/linbudu599/GraphQL-Explorer)
![GitHub](https://img.shields.io/github/license/linbudu599/GraphQL-Explorer?color=deepgreen)

This is a demo which contains GraphQL and framework based on it(or work with it perfectly), including these for now:

- [x] GraphQL
- [x] TypeGraphQL
- [x] Apollo-Client & React & Parcel
- [x] Apollo-Server
- [x] DataLoader
- [x] TypeORM + SQLite3
- [ ] Redis + IORedis
- [x] Winston
- [x] TypeStack Product
  - Class-Validator
  - Class-Transformer

## Client & Server Deploy

- [x] [Client-Vercel](https://linbudu-graphql-explorer.vercel.app/)
- [x] [Client-Netlify](linbudu-graphql-explorer.netlify.app)
- [ ] [Server-ALI-Cloud]
- [ ] [Server-Heroku]

## Progress

**IN_PROGRESS**

## Explore

```bash
npm install
npm run dev
# or use 2 terminals
npm run dev:client
npm run dev:server
```

## Available Scripts

- `dev`: `dev:client` + `dev:server`
- `dev:client`: develop client application
- `test:client`: run test cases in client
- `build:client`: build client application by `Parcel`
- `clean`: remove build ooutput `/client-dist` & `/server-dist` directory
- `dev:server`: develop server
- `start:server`: run in prod by nodemon
- `build:server`: compile server code
- `pm2`: run in prod by PM2(`fork mode`)
- `stress-test`: run stress test to server, see [stress-fork.js](./pt-fork.js) & [stress-main.js](./st-main.js)

## Document

see offcial docs for more information.

- [Apollo-GraphQL](https://www.apollographql.com/docs/)
- [TypeGraphQL](https://typegraphql.com/)
- [TypeStack](https://github.com/typestack)
- [TypeORM](https://github.com/typeorm)
