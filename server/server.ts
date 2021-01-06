import "reflect-metadata";
import "apollo-cache-control";
import { Context } from "koa";
import path from "path";
import { getOperationAST } from "graphql";
import dotenv from "dotenv";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { buildSchemaSync, ResolverData } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";

import { GraphQLRequestContext } from "apollo-server-plugin-base";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";

import ExecutorResolver from "./resolver/Executor.resolver";
import RecipeResolver from "./resolver/Recipe.resolver";
import TaskResolver from "./resolver/Task.resolver";
import PubSubResolver from "./resolver/PubSub.resolver";
import AccountResolver from "./resolver/Account.resolver";
import SubstanceResolver from "./resolver/Substance.resolver";
import PublicResolver from "./resolver/Public.resolver";
import RecordResolver from "./resolver/Record.resolver";

import { log } from "./utils/helper";
import { genarateRandomID } from "./utils/auth";
import { authChecker } from "./utils/authChecker";
import { PLAY_GROUND_SETTINGS } from "./utils/constants";
import { setRecipeInContainer, dbConnect } from "./utils/mock";

// Middlewares applied on TypeGraphQL
import ResolveTime from "./middleware/time";
import { InterceptorOnSCP1128 } from "./middleware/interceptor";
import LogAccessMiddleware from "./middleware/log";
import ErrorLoggerMiddleware from "./middleware/error";

// Extensions powered by TypeGraphQL
import { ExtensionsMetadataRetriever } from "./extensions/GetMetadata";
// Extension pn Apollo(GraphQL-Extensions Package)
import { CustomExtension } from "./extensions/apollo";

// Apollo Data Source
import SpaceXDataSource from "./datasource/SpaceX";

import { IContext } from "./typding";

import { GraphQLResponse } from "graphql-extensions";

import complexityPlugin from "./plugins/complexity";
import extensionPlugin from "./plugins/extension";
import { schemaPlugin, usagePlugin } from "./plugins/report";
import scopedContainerPlugin from "./plugins/scopedContainer";
import responseCachePlugin from "apollo-server-plugin-response-cache";

Container.set({ id: "INIT_INJECT_DATA", factory: () => new Date() });

TypeORM.useContainer(Container);

const dev = process.env.NODE_ENV === "development";

dotenv.config({ path: dev ? ".env.dev" : ".env.prod" });
log(`[Env] Loading ${dev ? "[DEV]" : "[PROD]"} File`);

const basicMiddlewares = [
  ResolveTime,
  // InterceptorOnSCP1128,
  ExtensionsMetadataRetriever,
  LogAccessMiddleware,
];

setRecipeInContainer();

const schema = buildSchemaSync({
  resolvers: [
    ExecutorResolver,
    RecipeResolver,
    TaskResolver,
    PubSubResolver,
    AccountResolver,
    SubstanceResolver,
    PublicResolver,
    RecordResolver,
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

const server = new ApolloServer({
  schema,
  subscriptions: {
    onConnect: () => log("[Subscription] Connected to websocket"),
  },
  context: async ({ ctx }: { ctx: Context }) => {
    // TODO: get account type from token
    // const token: string | null = ctx.request?.headers?.token ?? null;

    const { id, type } = genarateRandomID();
    // 每次请求使用一个随机ID注册容器
    const container = Container.of(id);

    const context = {
      env: process.env.NODE_ENV,
      currentUser: {
        accountId: id,
        roles: type,
      },
      container,
    };

    container.set("context", context);
    return context;
  },
  extensions: [() => new CustomExtension()],
  // 其实放在context里就可以自己用了
  dataSources: () => ({
    SpaceXAPI: new SpaceXDataSource(),
  }),
  plugins: [
    schemaPlugin(),
    usagePlugin(),
    complexityPlugin(schema),
    extensionPlugin(),
    scopedContainerPlugin(Container),
    ApolloServerLoaderPlugin({
      typeormGetConnection: TypeORM.getConnection,
    }),
    responseCachePlugin({
      // 被标记为PRIVATE的字段缓存只会用于相同sessionID
      sessionId: (ctx: GraphQLRequestContext) =>
        ctx.request.http?.headers.get("sessionId") || null,
      shouldReadFromCache: (ctx: GraphQLRequestContext) => false,
      shouldWriteToCache: (ctx: GraphQLRequestContext) => false,
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
  // 2333 关掉不能在生产环境用playground了hhh 但是能正常查询
  introspection: true,
  // engine: true,
  // formatError: () => {},
  formatResponse: (
    response: GraphQLResponse | null,
    requestContext: GraphQLRequestContext<object>
  ) => {
    response!.extensions = {
      ...response!.extensions,
      FROM_RESPONSE_FORMATTER: "FROM_RESPONSE_FORMATTER",
    };

    return response as GraphQLResponse;
  },
  playground: {
    settings: PLAY_GROUND_SETTINGS,
  },
  cacheControl: {
    defaultMaxAge: 60,
  },
});

export default async (): Promise<ApolloServer> => {
  await dbConnect();

  return server;
};

export const createTestServer = (): ApolloServer => server;
