import "reflect-metadata";
import { Context } from "koa";
import path from "path";
import dotenv from "dotenv";
import { Container, ContainerInstance } from "typedi";
import * as TypeORM from "typeorm";
import { buildSchema, ResolverData } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import {
  GraphQLRequestContext,
  ApolloServerPlugin,
} from "apollo-server-plugin-base";

// TypeGraphQL
import { JOB } from "../graphql/User";
import UserResolver from "../resolver/User.resolver";
import RecipeResolver from "../resolver/Recipe.resolver";
import TaskResolver from "../resolver/Task.resolver";
import PubSubResolver from "../resolver/PubSub.resolver";

// TypeORM
import User from "../entity/User";
import Task from "../entity/Task";

import { log } from "./helper";
import { authChecker } from "./authChecker";
import { ACCOUNT_AUTH } from "./constants";
import { setRecipeInContainer } from "./mock";

// Middlewares applied on TypeGraphQL
import ResolveTime from "../middleware/time";
import InterceptorOnUID1 from "../middleware/interceptor";
import LogAccessMiddleware from "../middleware/log";

import { ExtensionsMetadataRetriever } from "../extensions/GetMetadata";

import { IContext } from "../typding";

Container.set({ id: "INIT_INJECT_DATA", factory: () => new Date() });

TypeORM.useContainer(Container);

const dev = process.env.NODE_ENV === "development";

dotenv.config({ path: dev ? ".env.dev" : ".env.prod" });

log(`[Env] Loading ${dev ? "[DEV]" : "[PROD]"} File`);

export default async (): Promise<ApolloServer> => {
  setRecipeInContainer();

  const schema = await buildSchema({
    resolvers: [UserResolver, RecipeResolver, TaskResolver, PubSubResolver],
    // container: Container,
    // scoped-container，每次从context中拿到本次注册容器
    container: ({ context }: ResolverData<IContext>) => context.container,
    // TypeGraphQL built-in Scalar Date
    dateScalarMode: "timestamp",
    authChecker,
    authMode: "error",
    emitSchemaFile: path.resolve(__dirname, "../typegraphql/shema.gql"),
    validate: true,
    globalMiddlewares: [
      ResolveTime,
      InterceptorOnUID1,
      ExtensionsMetadataRetriever,
      LogAccessMiddleware,
    ],
  });

  await dbConnect();

  const server = new ApolloServer({
    // options schema will override typeDefs & resolvers
    // so donot use typegraphql and apollo-server to merge schema
    schema,
    // subscriptions: {
    //   path: "/pubsub",
    // },
    context: async (ctx: Context) => {
      // 随机鉴权
      // 为0时TypeDI容器注册会失败
      const randomID = Math.floor(Math.random() * 100) + 1;
      // 1-31 unlogin
      // 32-61 common
      // 62-101 admin

      const UN_LOGIN = randomID >= 1 && randomID <= 31;
      const COMMON = randomID >= 32 && randomID <= 61;
      const ADMIN = randomID >= 62 && randomID <= 101;

      const ACCOUNT_TYPE = UN_LOGIN
        ? ACCOUNT_AUTH.UN_LOGIN
        : COMMON
        ? ACCOUNT_AUTH.COMMON
        : ACCOUNT_AUTH.ADMIN;

      // 每次请求使用一个随机ID注册容器
      const container = Container.of(randomID);

      const context = {
        // req,
        env: process.env.NODE_ENV,
        // token: ctx.headers.authorization,
        currentUser: {
          uid: randomID,
          roles: ACCOUNT_TYPE,
        },
        container,
      };

      container.set("context", context);
      return context;
    },
    plugins: [
      {
        // 在每次请求开始前销毁上一个容器
        requestDidStart: () => ({
          willSendResponse(
            reqContext: GraphQLRequestContext<Partial<IContext>>
          ) {
            Container.reset(reqContext.context.currentUser!.uid);
            const instancesIds = ((Container as any)
              .instances as ContainerInstance[]).map((instance) => instance.id);
            console.log("instances left in memory:", instancesIds);
          },
        }),
      },
    ],
    // 关于RootValue和Context：https://stackoverflow.com/questions/44344560/context-vs-rootvalue-in-apollo-graphql
    // 简单的说，RootValue就像是一个自定义的类型（和其他类型一样），但它只拥有一个动态解析的字段
    // RootValue是解析链的初始值 也就是入口Resolver的parent参数
    rootValue: (documentAST) => {
      // const op = getOperationAST(documentNode);
      // return op === "mutation" ? mutationRoot : queryRoot;
    },
    introspection: true,
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
    const connection = await TypeORM.createConnection({
      type: "sqlite",
      name: "default",
      // use different databse
      database: "./info.db",
      // disabled in prod
      synchronize: true,
      dropSchema: true,
      logging: "all",
      maxQueryExecutionTime: 1000,
      logger: "advanced-console",
      // TODO: remove to env variables
      entities: [dev ? "server/entity/*.ts" : "server-dist/entity/*.js"],
      cache: {
        duration: 3000,
      },
    });

    const task1 = new Task();
    task1.taskTitle = "task1";
    task1.taskContent = "task1";
    task1.taskReward = 1000;
    task1.taskRate = 1;

    await connection.manager.save(task1);

    const task2 = new Task();
    task2.taskTitle = "task2";
    task2.taskContent = "task2";
    task2.taskReward = 1000;
    task2.taskRate = 1;

    await connection.manager.save(task2);

    const task3 = new Task();
    task3.taskTitle = "task3";
    task3.taskContent = "task3";
    task3.taskReward = 1000;
    task3.taskRate = 1;

    await connection.manager.save(task3);

    const user = new User();
    user.name = "林不渡-Lv1";
    user.job = JOB.FE;

    user.tasks = [task1, task2];

    await connection.manager.save(user);

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
