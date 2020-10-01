import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { Context } from "koa";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import path from "path";
import * as TypeORM from "typeorm";
import { log } from "./";

// TypeGraphQL
import UserResolver from "../resolver/User.resolver";
import RecipeResolver from "../resolver/Recipe.resolver";
import User from "../entity/User";
import { authChecker } from "./authChecker";
import ResolveTime from "../middleware/time";
import InterceptorOnUid1 from "../middleware/interceptor";
import LogMiddleware from "../middleware/time";

// Apollo-Server
import studentTypeDefs from "../graphql/Student.type";
import studentResolver from "../resolver/Student.resolver";
import fileSchema from "../graphql/File.type";
// import fileTypeDefs from "../graphql/File.type";
// import fileResolver from "../resolver/File.resolver";
import workerDataSource from "../datasource/worker";

TypeORM.useContainer(Container);

export default async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [UserResolver, RecipeResolver],
    container: Container,
    dateScalarMode: "timestamp",
    authChecker,
    authMode: "error",
    emitSchemaFile: path.resolve(__dirname, "../typegraphql/shema.gql"),
    validate: true,
    globalMiddlewares: [LogMiddleware, ResolveTime, InterceptorOnUid1],
  });

  await dbConnect();

  const server = new ApolloServer({
    // TODO: merge resolver automatically
    // options schema will override typeDefs & resolvers
    // so u donot use typegraphql and apollo-server to merge schema
    typeDefs: [studentTypeDefs],
    resolvers: [studentResolver],
    // uploads: false,
    // override typeDefs & resolvers
    // schema: fileSchema,
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
      workerAPI: new workerDataSource(),
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
