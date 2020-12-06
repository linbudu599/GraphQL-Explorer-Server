# GraphQL-Explorer

[![Netlify Status](https://api.netlify.com/api/v1/badges/9b1032ca-eb12-4cfd-bfad-52da4b8b5451/deploy-status)](https://app.netlify.com/sites/linbudu-graphql-explorer/deploys)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/linbudu599/GraphQL-Explorer/GraphQL-Explorer-Client/master?label=GitHub%20Actions%20Client)
![Travis (.com)](https://img.shields.io/travis/com/linbudu599/GraphQL-Explorer?label=travis%20client)
![Codecov](https://img.shields.io/codecov/c/github/linbudu599/GraphQL-Explorer)
![GitHub](https://img.shields.io/github/license/linbudu599/GraphQL-Explorer?color=deepgreen)

![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/linbudu599/GraphQL-Explorer/graphql)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/linbudu599/GraphQL-Explorer/type-graphql)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/linbudu599/GraphQL-Explorer/apollo-server)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/linbudu599/GraphQL-Explorer/react)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/linbudu599/GraphQL-Explorer/parcel-bundler)

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
- [x] [Voyager by Surge](http://graphql-explorer-voyager.surge.sh/) **(Require Local Server To Be Active)**
- [x] [Simple Example on Vercel Fucntions](https://graphql-faas.vercel.app/api/graphql), see also [Query Example](./api/graphql/query.graphql)
- [x] [Example on Vercel Fucntions, with MySQL](https://graphql-faas.linbudu599.vercel.app/api/migrate)
- [ ] [Server-ALI-Cloud]
- [ ] [Server-Heroku]
- [ ] [Apollo-Server-Lambda]
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
- `dev:client`: develop client application by [Parcel](https://github.com/parcel-bundler/parcel)
- `dev:server`: develop server by [nodemon](https://github.com/remy/nodemon)
- `test:client`: run test cases in client by [jest](https://github.com/facebook/jest)
- `build:client`: build client application by [Parcel](https://github.com/parcel-bundler/parcel)
- `clean`: remove `/client-dist` & `/server-dist` directory
- `start:server`: run in prod by [nodemon](https://github.com/remy/nodemon)
- `build:server`: compile server code by [tsc](https://github.com/microsoft/TypeScript)
- `pm2`: run in prod by [PM2](https://github.com/Unitech/pm2)
- `stress-test`: run pressure test to server, see [stress-fork.js](./st-fork.js) & [stress-main.js](./st-main.js)
- `voyager`: represent GraphQL API as an interactive graph by [GraphQL-Voyager](https://github.com/APIs-guru/graphql-voyager), **require server to be active**.
- `gen:code`: generate type definitions from GraphQL schema by [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator)
- `gen:docs`: generate documentation site from GraphQL schema by [graphdoc](https://github.com/2fd/graphdoc)
- `serve:docs`: generate & serve documentation site by [serve](https://github.com/vercel/serve)
- `commit`: commit code by [custom commitlint config](.cz-config.js)
- `prettier`: prettier all `.ts` / `.json` / `.graphql` ext file
- `typecheck`: check TypeScript type definitions
- `build:vercel`: build script on `Vercel Functions` build

## Document

see offcial docs for more information.

- [Apollo-GraphQL](https://www.apollographql.com/docs/)
- [TypeGraphQL](https://typegraphql.com/)
- [TypeStack](https://github.com/typestack)
- [TypeORM](https://github.com/typeorm)
