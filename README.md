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
- [ ] DataLoader
- [x] TypeORM + SQLite3
- [ ] Redis + IORedis
- [ ] Winston
- [x] TypeStack Product
  - Class-Validator
  - Class-Transformer

## Client & Server Deploy

- [x] [Client-Vercel](https://linbudu-graphql-explorer.vercel.app/)
- [x] [Client-Netlify](linbudu-graphql-explorer.netlify.app)
- [ ] [Server-ALI-Cloud]
- [ ] [Server-Heroku]

## Progress

see [docs](docs/README.md) for API will be used in this demo.

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
- `dev:server`: develop server
- `test:client`: invoke test cases in client
- `build:client`: build client application by Parcel
- `clean`: remove `/client-dist` & `/server-dist` directory
- `start:server`: run in prod by nodemon
- `compile:server`: compile server code
- `pm2:dev`: run in prod by PM2(`fork mode`)
- `pressure-test`: run pressure test to server, see[pressure-fork.js](./pt-fork.js) & [pressure-main.js](./pt-main.js)

## Document

see offcial docs for more information.

- [Apollo-GraphQL](https://www.apollographql.com/docs/)
- [TypeGraphQL](https://typegraphql.com/)
- [TypeStack](https://github.com/typestack)
- [TypeORM](https://github.com/typeorm)
