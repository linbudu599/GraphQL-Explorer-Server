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

This is a **demo** which contains `GraphQL` and framework based on it(or work with it perfectly), including these for now:

- [x] GraphQL
- [x] TypeGraphQL
- [x] Apollo-Client & React & Parcel
- [x] Apollo-Server
- [x] DataLoader
- [x] TypeORM + SQLite3
- [ ] Prisma Migration
- [ ] Redis + IORedis
- [x] Winston
- [x] TypeStack Product
  - Class-Validator
  - Class-Transformer

## 🏗️ &nbsp; Client & Server Deployment

### Client

- [x] [**PAGE_UNDER_DEVELOPING**] [Client by Vercel](https://linbudu-graphql-explorer.vercel.app/)
- [x] [**PAGE_UNDER_DEVELOPING**] [Client by Netlify](https://linbudu-graphql-explorer.netlify.app/)

### Server

- [x] [Docs by Surge](http://graphql-explorer-docs.surge.sh/)
- [x] [Voyager by Surge](http://graphql-explorer-voyager.surge.sh/) **(Require Local Server To Be Active)**
- [x] [Simple Example on Vercel Fucntions](https://graphql-faas.vercel.app/api/graphql), see [Query Example](./api/graphql/query.graphql)
- [x] [Example on Vercel Fucntions, with MySQL](https://graphql-faas.linbudu599.vercel.app/api/migrate)
- [ ] [Server-ALI-Cloud]
- [ ] [Server-Heroku]
- [x] [Apollo-Engine(**private**)](https://studio.apollographql.com/graph/My-Graph-innqj/explorer?schemaTag=current)

## 🛠️&nbsp; Progress

**IN_PROGRESS**

see [ROADMAP](https://github.com/linbudu599/GraphQL-Explorer/issues/1) for more details.

## 🚀&nbsp; Explore

```bash
npm install
npm run dev
# or use 2 terminals
npm run dev:client
npm run dev:server
```

## 🛵&nbsp; Available Scripts

- `dev`: `dev:client` + `dev:server`
- `build`: `build:client` + `build:server`
- `clean`: remove `/client-dist` & `/server-dist` & `api-dist` directory

- `dev:client`: develop client application by [Parcel](https://github.com/parcel-bundler/parcel)
- `build:client`: build client application by [Parcel](https://github.com/parcel-bundler/parcel)
- `test:client`: run test cases in client by [Jest](https://github.com/facebook/jest)

- `dev:server`: develop server by [nodemon](https://github.com/remy/nodemon)

- `start:server`: run in prod by [nodemon](https://github.com/remy/nodemon)

- `build:server`: compile server code by [tsc](https://github.com/microsoft/TypeScript)

- `test:server`: run test cases in server by [Jest](https://github.com/facebook/jest)

- `pm2`: run in prod by [PM2](https://github.com/Unitech/pm2)

- `stress-test`: run pressure test to server, see [stress-fork.js](./st-fork.js) & [stress-main.js](./st-main.js)

- `voyager`: represent GraphQL API as an interactive graph by [GraphQL-Voyager](https://github.com/APIs-guru/graphql-voyager), **require local server to be active**.

- `gen:code`: generate type definitions from GraphQL schema by [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator)

- `gen:docs`: generate documentation site from GraphQL schema by [graphdoc](https://github.com/2fd/graphdoc)

- `gen`: generate docs & code, as `gen:code` & `gen:docs` require local server alive, this command will use NodeJS `child_process` mod to handle server setup.

  not avaliable in windows cause `bash` command used.

- `serve:docs`: generate & serve documentation site by [serve](https://github.com/vercel/serve)

- `commit`: commit code by [custom commitlint config](.cz-config.js)

- `prettier`: prettier all `.ts` / `.json` / `.graphql` ext file

- `typecheck`: check TypeScript type definitions

- `build:vercel`: build script on [Vercel Functions](https://vercel.com/)

- `seed:config`: check [typeorm-seeding](https://github.com/w3tecch/typeorm-seeding) config

- `seed:run`: start seeding data in `/server/entity/seeds`

## 📔&nbsp; Document

see offcial docs for more information.

- [Apollo-GraphQL](https://www.apollographql.com/docs/)
- [TypeGraphQL](https://typegraphql.com/)
- [TypeStack](https://github.com/typestack)
- [TypeORM](https://github.com/typeorm)
