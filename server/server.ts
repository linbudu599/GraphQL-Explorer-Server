import "reflect-metadata";
import { Context } from "koa";
import path from "path";
import { getOperationAST } from "graphql";
import dotenv from "dotenv";
import { Container, ContainerInstance } from "typedi";
import * as TypeORM from "typeorm";
import { buildSchema, ResolverData } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
// 上报API信息至Apollo-Engine
import {
  // API各operation与field的使用状况
  ApolloServerPluginUsageReporting,
  // APISchema
  ApolloServerPluginSchemaReporting,
  // API性能 更适用于apollo-gateway
  // ApolloServerPluginInlineTrace,
} from "apollo-server-core";
import { GraphQLRequestContext } from "apollo-server-plugin-base";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import {
  getComplexity,
  simpleEstimator,
  fieldExtensionsEstimator,
} from "graphql-query-complexity";

import ExecutorResolver from "./resolver/Executor.resolver";
import RecipeResolver from "./resolver/Recipe.resolver";
import TaskResolver from "./resolver/Task.resolver";
import PubSubResolver from "./resolver/PubSub.resolver";
import AccountResolver from "./resolver/Account.resolver";
import SubstanceResolver from "./resolver/Substance.resolver";
import PublicResolver from "./resolver/Public.resolver";

import { log } from "./utils/helper";
import { genarateRandomID } from "./utils/auth";
import { authChecker } from "./utils/authChecker";
import {
  MAX_ALLOWED_COMPLEXITY,
  PLAY_GROUND_SETTINGS,
} from "./utils/constants";
import { setRecipeInContainer, dbConnect } from "./utils/mock";

// Middlewares applied on TypeGraphQL
import ResolveTime from "./middleware/time";
import { InterceptorOnSCP1128 } from "./middleware/interceptor";
import LogAccessMiddleware from "./middleware/log";
import ErrorLoggerMiddleware from "./middleware/error";

// Extensions powered by TypeGraphQL
import { ExtensionsMetadataRetriever } from "./extensions/GetMetadata";

// Apollo Data Source
import SpaceXDataSource from "./datasource/SpaceX";

import { IContext } from "./typding";

Container.set({ id: "INIT_INJECT_DATA", factory: () => new Date() });
TypeORM.useContainer(Container);

const dev = process.env.NODE_ENV === "development";
dotenv.config({ path: dev ? ".env.dev" : ".env.prod" });

log(`[Env] Loading ${dev ? "[DEV]" : "[PROD]"} File`);

const basicMiddlewares = [
  ResolveTime,
  InterceptorOnSCP1128,
  ExtensionsMetadataRetriever,
  LogAccessMiddleware,
];

export default async (): Promise<ApolloServer> => {
  setRecipeInContainer();

  const schema = await buildSchema({
    // TODO: get by generation
    resolvers: [
      ExecutorResolver,
      RecipeResolver,
      TaskResolver,
      PubSubResolver,
      AccountResolver,
      SubstanceResolver,
      PublicResolver,
    ],
    // container: Container,
    // scoped-container，每次从context中拿到本次注册容器
    container: ({ context }: ResolverData<IContext>) => context.container,
    // TypeGraphQL built-in Scalar Date
    dateScalarMode: "timestamp",
    authChecker: dev ? () => true : authChecker,
    authMode: "error",
    emitSchemaFile: path.resolve(__dirname, "./typegraphql/shema.graphql"),
    validate: true,
    globalMiddlewares: dev
      ? basicMiddlewares
      : [...basicMiddlewares, ErrorLoggerMiddleware],
  });

  await dbConnect();

  const server = new ApolloServer({
    schema,
    subscriptions: {
      onConnect: () => log("[Subscription] Connected to websocket"),
    },
    context: async ({ ctx }: { ctx: Context }) => {
      log("=== TOKEN ===");
      // TODO: validate token by koa-jwt
      const token = ctx.request.headers["token"];

      const { id, type } = genarateRandomID();
      // 每次请求使用一个随机ID注册容器
      const container = Container.of(id);

      const context = {
        // req,
        env: process.env.NODE_ENV,
        // token: ctx.headers.authorization,
        currentUser: {
          accountId: id,
          roles: type,
        },
        container,
      };

      container.set("context", context);
      return context;
    },
    // 放在context里就可以自己用了
    dataSources: () => ({
      SpaceXAPI: new SpaceXDataSource(),
    }),
    plugins: [
      process.env.APOLLO_KEY ? ApolloServerPluginSchemaReporting() : {},
      process.env.APOLLO_KEY
        ? ApolloServerPluginUsageReporting({
            sendVariableValues: { all: true },
            sendHeaders: { all: true },
            sendReportsImmediately: true,
          })
        : {},

      {
        // 在每次请求开始前销毁上一个容器
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              operationName: request.operationName!,
              // query document
              query: document,
              variables: request.variables,
              // 估测器，依次触发，第一个被估测器返回的数字值会被作为字段复杂度
              estimators: [
                // Using fieldExtensionsEstimator is mandatory to make it work with type-graphql.
                fieldExtensionsEstimator(),
                // 兜底，如果没有估测器返回值会报错
                simpleEstimator({ defaultComplexity: 1 }),
              ],
            });

            if (complexity > MAX_ALLOWED_COMPLEXITY) {
              throw new Error(
                `Sorry, too complicated query! ${complexity} is over ${MAX_ALLOWED_COMPLEXITY} that is the max allowed complexity.`
              );
            }

            console.log("Used query complexity points:", complexity);
          },

          executionDidStart(
            reqContext: GraphQLRequestContext<Partial<IContext>>
          ) {
            // TODO: log execution info
          },

          willSendResponse(
            reqContext: GraphQLRequestContext<Partial<IContext>>
          ) {
            Container.reset(reqContext.context.currentUser!.accountId);
            const instancesIds = ((Container as any)
              .instances as ContainerInstance[]).map((instance) => instance.id);
            console.log("instances left in memory:", instancesIds);
          },
        }),
      },
      ApolloServerLoaderPlugin({
        typeormGetConnection: TypeORM.getConnection, // for use with TypeORM
      }),
    ],
    // 关于RootValue和Context：https://stackoverflow.com/questions/44344560/context-vs-rootvalue-in-apollo-graphql
    // 简单的说，RootValue就像是一个自定义的类型（和其他类型一样），但它只拥有一个动态解析的字段
    // RootValue是解析链的初始值 也就是入口Resolver的parent参数
    rootValue: (documentAST) => {
      const op = getOperationAST(documentAST);
      return {
        operation: op?.operation,
      };
    },
    introspection: dev,
    // tracing: true,
    // engine: true,
    // formatError: () => {},
    // formatResponse: () => {},
    playground: {
      settings: PLAY_GROUND_SETTINGS,
    },
  });

  return server;
};
