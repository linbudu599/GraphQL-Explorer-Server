import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer as ApolloVercelServer } from "@saeris/apollo-server-vercel";

import RecipeResolver from "./graphql/resolver";

const schema = buildSchemaSync({
  resolvers: [RecipeResolver],
});

const server = new ApolloVercelServer({
  schema,
  playground: true,
  introspection: true,
});

export default server.createHandler();
