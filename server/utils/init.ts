import "reflect-metadata";
import { Context } from "koa";
import path from "path";
import dotenv from "dotenv";
import { Container, ContainerInstance } from "typedi";
import * as TypeORM from "typeorm";
import { buildSchema, ResolverData } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import { GraphQLRequestContext } from "apollo-server-plugin-base";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import {
  getComplexity,
  simpleEstimator,
  fieldExtensionsEstimator,
} from "graphql-query-complexity";

import UserResolver from "../resolver/User.resolver";
import RecipeResolver from "../resolver/Recipe.resolver";
import TaskResolver from "../resolver/Task.resolver";
import PubSubResolver from "../resolver/PubSub.resolver";
import AccountResolver from "../resolver/Account.resolver";

import { log } from "./helper";
import { genarateRandomID } from "./auth";
import { authChecker } from "./authChecker";
import { MAX_ALLOWED_COMPLEXITY } from "./constants";
import { setRecipeInContainer, dbConnect } from "./mock";

// Middlewares applied on TypeGraphQL
import ResolveTime from "../middleware/time";
import InterceptorOnUID1 from "../middleware/interceptor";
import LogAccessMiddleware from "../middleware/log";
import ErrorLoggerMiddleware from "../middleware/error";

// Extensions powered by TypeGraphQL
import { ExtensionsMetadataRetriever } from "../extensions/GetMetadata";

// Apollo Data Source
import SpaceXDataSource from "../datasource/SpaceX";

import { IContext } from "../typding";

Container.set({ id: "INIT_INJECT_DATA", factory: () => new Date() });
TypeORM.useContainer(Container);

const dev = process.env.NODE_ENV === "development";
dotenv.config({ path: dev ? ".env.dev" : ".env.prod" });

log(`[Env] Loading ${dev ? "[DEV]" : "[PROD]"} File`);

const basicMiddlewares = [
  ResolveTime,
  InterceptorOnUID1,
  ExtensionsMetadataRetriever,
  LogAccessMiddleware,
];

export default async (): Promise<ApolloServer> => {
  setRecipeInContainer();

  const schema = await buildSchema({
    // TODO: get by generation
    resolvers: [
      UserResolver,
      RecipeResolver,
      TaskResolver,
      PubSubResolver,
      AccountResolver,
    ],
    // container: Container,
    // scoped-container，每次从context中拿到本次注册容器
    container: ({ context }: ResolverData<IContext>) => context.container,
    // TypeGraphQL built-in Scalar Date
    dateScalarMode: "timestamp",
    authChecker,
    authMode: "error",
    emitSchemaFile: path.resolve(__dirname, "../typegraphql/shema.graphql"),
    validate: true,
    globalMiddlewares: basicMiddlewares,
    // globalMiddlewares: dev
    //   ? [...basicMiddlewares, ErrorLoggerMiddleware]
    //   : basicMiddlewares,
  });

  await dbConnect();

  const server = new ApolloServer({
    schema,
    // subscriptions: {
    //   path: "/pubsub",
    // },
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
          uid: id,
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
            Container.reset(reqContext.context.currentUser!.uid);
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
