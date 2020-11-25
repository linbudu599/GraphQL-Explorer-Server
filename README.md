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

- [x] [Client by Vercel](https://linbudu-graphql-explorer.vercel.app/)
- [x] [Client by Netlify](https://linbudu-graphql-explorer.netlify.app/)
- [x] [Docs by Surge](http://graphql-explorer-docs.surge.sh/)
- [ ] [Voyager by Surge](http://graphql-explorer-voyager.surge.sh/)
- [ ] [Server-ALI-Cloud]
- [ ] [Server-Heroku]
- [x] [Apollo-Engine(private)](https://studio.apollographql.com/graph/My-Graph-innqj/explorer?schemaTag=current)

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
- `dev:server`: develop server
- `test:client`: invoke test cases in client
- `build:client`: build client application by Parcel
- `clean`: remove `/client-dist` & `/server-dist` directory
- `start:server`: run in prod by nodemon
- `build:server`: compile server code
- `pm2:dev`: run in prod by PM2(`fork mode`)
- `pressure-test`: run pressure test to server, see[pressure-fork.js](./pt-fork.js) & [pressure-main.js](./pt-main.js)
- `voyager`: represent GraphQL API as an interactive graph by [graphql-voyager](https://github.com/APIs-guru/graphql-voyager), require server to be active.
- `gen:code`: generate type definitions from GraphQL schema
- `gen:docs`: generate documentation site from GraphQL schema
- `serve:docs`: generate & serve documentation site

## Document

see offcial docs for more information.

- [Apollo-GraphQL](https://www.apollographql.com/docs/)
- [TypeGraphQL](https://typegraphql.com/)
- [TypeStack](https://github.com/typestack)
- [TypeORM](https://github.com/typeorm)
