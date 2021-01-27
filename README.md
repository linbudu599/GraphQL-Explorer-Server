# GraphQL-Explorer-Server

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/linbudu599/GraphQL-Explorer-Server/GraphQL-Explorer-Server)
![Codecov](https://img.shields.io/codecov/c/github/linbudu599/GraphQL-Explorer-Server)
![GitHub last commit](https://img.shields.io/github/last-commit/linbudu599/GraphQL-Explorer-Server)
![David](https://img.shields.io/david/dev/linbudu599/GraphQL-Explorer-Server?label=dependencies)

![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/linbudu599/GraphQL-Explorer/graphql)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/linbudu599/GraphQL-Explorer/type-graphql)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/linbudu599/GraphQL-Explorer/apollo-server)

This is a **demo** which contains `GraphQL` and framework based on it(or work with it perfectly), including these for now:

- [x] GraphQL
- [x] TypeGraphQL
- [x] Apollo-Server
- [x] DataLoader
- [x] TypeORM + SQLite3
- [x] Prisma Migration
- [ ] Redis + IORedis
- [x] Winston
- [x] TypeStack Product
  - Class-Validator
  - Class-Transformer

## :satellite: Explain

- :construction: **WIP** [使用最流行的技术栈搭建一个 GraphQL 服务器](./docs/README.md)

## 🏗️ &nbsp; Server & Docs Deployment

- [x] [Docs by Surge](http://graphql-explorer-docs.surge.sh/)
- [x] [Voyager by Surge](http://graphql-explorer-voyager.surge.sh/) **(Require Local Server To Be Active)**
- [x] [Voyager on Remote Server(UNSTABLE)](http://voyager.linbudu.top/)
- [x] [Simple Example on Vercel Fucntions](https://graphql-faas.vercel.app/api/graphql), see [Query Example](./api/graphql/query.graphql)
- [x] [Example on Vercel Fucntions, with MySQL](https://graphql-faas.linbudu599.vercel.app/api/migrate)
- [x] [Server-ALI-Cloud(UNSTABLE)](http://47.97.183.158:4399/graphql)
- [ ] [Server-Heroku]
- [x] [Apollo-Engine(**private**)](https://studio.apollographql.com/graph/My-Graph-innqj/explorer?schemaTag=current)

## 🛠️&nbsp; Progress

**IN_PROGRESS**

see [ROADMAP](https://github.com/linbudu599/GraphQL-Explorer/issues/1) for more details.

## 🚀&nbsp; Explore

```bash
npm install
npm run dev # dev
```

## 🛵&nbsp; Available Scripts

- `dev`: develop server by [nodemon](https://github.com/remy/nodemon)
- `build`: compile server code by [tsc](https://github.com/microsoft/TypeScript)
- `start`: run in prod by [nodemon](https://github.com/remy/nodemon)
- `clean`: remove `/server-dist` & `api-dist` directory
- `test`: run test cases by [Jest](https://github.com/facebook/jest)
- `pm2`: run in prod by [PM2](https://github.com/Unitech/pm2)
- `stress-test`: run pressure test to server, see [stress-fork.js](./st-fork.js) & [stress-main.js](./st-main.js)
- `voyager`: represent GraphQL API as an interactive graph by [GraphQL-Voyager](https://github.com/APIs-guru/graphql-voyager), **require local server to be active**.
- `gen:code`: generate type definitions from GraphQL schema by [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator)
- `gen:docs`: generate documentation site from GraphQL schema by [graphdoc](https://github.com/2fd/graphdoc)
- `gen`: generate docs & code, as `gen:code` & `gen:docs` require local server alive, this command will use NodeJS `child_process` mod to handle server setup.

> not avaliable in windows cause `bash` command used.

- `serve:docs`: generate & serve documentation site by [serve](https://github.com/vercel/serve)
- `commit`: commit code by [custom commitlint config](.cz-config.js)
- `prettier`: prettier all `.ts` / `.json` / `.graphql` ext file
- `typecheck`: check TypeScript type definitions
- `build:vercel`: build script on [Vercel Functions](https://vercel.com/)
- `seed:config`: check [typeorm-seeding](https://github.com/w3tecch/typeorm-seeding) config
- `seed:run`: start seeding data in `/server/entity/seeds`
- `genql`: generate GraphQL query builder by [GenQL](https://github.com/remorses/genql)

## 📔&nbsp; Document

see offcial docs for more information.

- [Apollo-GraphQL](https://www.apollographql.com/docs/)
- [TypeGraphQL](https://typegraphql.com/)
- [TypeStack](https://github.com/typestack)
- [TypeORM](https://github.com/typeorm)
