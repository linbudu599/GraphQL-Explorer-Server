import "reflect-metadata";
import { Context } from "koa";
import path from "path";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import { log } from "./";

import { ACCOUNT_AUTH } from "./constants";

// TypeGraphQL
import UserResolver from "../resolver/User.resolver";
import RecipeResolver from "../resolver/Recipe.resolver";

import User from "../entity/User";
import Task from "../entity/Task";

import { JOB } from "../graphql/User";

import { authChecker } from "./authChecker";

import ResolveTime from "../middleware/time";
import InterceptorOnUid1 from "../middleware/interceptor";
import LogMiddleware from "../middleware/time";

TypeORM.useContainer(Container);

export default async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [UserResolver, RecipeResolver],
    container: Container,
    // built-in Scalar Date
    dateScalarMode: "timestamp",
    authChecker,
    authMode: "error",
    emitSchemaFile: path.resolve(__dirname, "../typegraphql/shema.gql"),
    validate: true,
    globalMiddlewares: [ResolveTime, InterceptorOnUid1],
  });

  await dbConnect();

  const server = new ApolloServer({
    // TODO: merge resolver automatically
    // options schema will override typeDefs & resolvers
    // so u donot use typegraphql and apollo-server to merge schema
    // override typeDefs & resolvers
    schema,
    context: async (ctx: Context) => {
      // TODO: 把数据库连接注入到上下文?

      const randomID = Math.floor(Math.random() * 100);
      // 0-30 unlogin
      // 31-60 common
      // 61-100 admin

      const UN_LOGIN = randomID >= 0 && randomID <= 30;
      const COMMON = randomID >= 31 && randomID <= 60;
      const ADMIN = randomID >= 61 && randomID <= 100;

      const ACCOUNT_TYPE = UN_LOGIN
        ? ACCOUNT_AUTH.UN_LOGIN
        : COMMON
        ? ACCOUNT_AUTH.COMMON
        : ACCOUNT_AUTH.ADMIN;

      const context = {
        // req,
        env: process.env.NODE_ENV,
        // token: ctx.headers.authorization,
        currentUser: {
          uid: randomID,
          roles: ACCOUNT_TYPE,
        },
      };
      return context;
    },
    rootValue: (documentAST) => {
      // const op = getOperationAST(documentNode);
      // return op === "mutation" ? mutationRoot : queryRoot;
    },
    // introspection: true,
    // tracing: true,
    // engine: true,
    // formatError: () => {},
    // formatResponse: () => {},
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
  log("=== [TypeORM] TypeORM Connecting ===");
  try {
    const connection = await TypeORM.createConnection();

    // TODO: reorganize data table
    const user = new User();
    user.name = "林不渡-Lv1";
    user.job = JOB.FE;

    await connection.manager.insert(User, user);

    const task = new Task();
    task.taskTitle = "xxx";
    task.taskContent = "XXX";
    task.taskReward = 1000;
    task.taskRate = 1;
    task.assignee = user;

    await connection.manager.insert(Task, task);

    log("=== [TypeORM] Database Connection Established ===");
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
    log("=== [TypeORM] Initial Mock Data Inserted ===\n");
  } catch (error) {
    log(error, "red");
  }
};
