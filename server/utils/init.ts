import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { Context } from "koa";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import * as TypeORM from "typeorm";

import UserResolver from "../resolver/User.resolver";
import RecipeResolver from "../resolver/Recipe.resolver";
import User from "../entity/User";
import path from "path";
import { log } from "./";
import { authChecker } from "../lib/authChecker";
import ResolveTime from "../middleware/time";
import studentTypeDefs from "../graphql/Student.type";
import studentResolver from "../resolver/Student.resolver";
import dataSource from "../datasource/Student";

TypeORM.useContainer(Container);

export default async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [UserResolver, RecipeResolver],
    container: Container,
    dateScalarMode: "timestamp",
    authChecker,
    authMode: "error",
    emitSchemaFile: path.resolve(__dirname, "../gql/shema.gql"),
    validate: true,
    globalMiddlewares: [ResolveTime],
  });

  await dbConnect();

  const server = new ApolloServer({
    typeDefs: [studentTypeDefs],
    resolvers: [studentResolver],
    // override typeDefs & resolvers
    // schema,
    context: async (ctx: Context) => {
      const context = {
        // req,
        env: process.env.NODE_ENV,
        // token: ctx.headers.authorization,
        currentUser: {
          uid: "0001",
          name: "Test Account 001",
          roles: ["ADMIN"],
        },
      };
      return context;
    },
    rootValue: (documentAST) => {
      // const op = getOperationAST(documentNode);
      // return op === "mutation" ? mutationRoot : queryRoot;
    },
    dataSources: () => ({
      DataAPI: new dataSource(),
    }),
    introspection: true,
    tracing: true,
    // engine: true,
    // formatError: () => {},
    // formatResponse: () => {},
    // cors: true,
    playground: {
      settings: {
        "editor.theme": "dark",
        "editor.fontSize": 16,
        "tracing.hideTracingResponse": false,
        "queryPlan.hideQueryPlanResponse": false,
        "editor.fontFamily": `'Fira Code', 'Source Code Pro', 'Consolas'`,
      },
    },
  });

  return server;
};

export const dbConnect = async (): Promise<any> => {
  log("=== TypeORM Connecting ===");
  try {
    const connection = await TypeORM.createConnection();
    log("=== Database Connection Established ===");
    await connection.manager.insert(User, {
      name: "林不渡1",
      age: 21,
      isFool: true,
    });
    await connection.manager.insert(User, {
      name: "林不渡2",
      age: 21,
      isFool: true,
    });
    await connection.manager.insert(User, {
      name: "林不渡3",
      age: 21,
      isFool: true,
    });
  } catch (error) {
    log(error, "red");
  }
};
