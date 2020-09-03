import { ApolloServer, gql } from "apollo-server";

import { mockResolver } from "./utils";

const typeDefs = gql`
  type User {
    name: String
    age: Int
    isFool: Boolean
  }

  type Query {
    user: User
  }
`;

const resolvers = {
  Query: {
    user: mockResolver,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
