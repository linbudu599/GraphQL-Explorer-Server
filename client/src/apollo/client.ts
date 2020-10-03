import { InMemoryCache, ApolloClient, gql, Resolvers } from '@apollo/client';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { createUploadLink } from 'apollo-upload-client';
import CounterResolver from '../local/Counter/resolver';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default function createApolloClient() {
  // const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
  //   resolvers: [CounterResolver],
  //   skipCheck: true, // allow for schema without queries
  // });

  const cache = new InMemoryCache({
    // __typename added
    addTypename: true,
    // use === to compare query result & cache
    resultCaching: true,
  });

  const client = new ApolloClient({
    cache,
    uri: 'http://localhost:4000/graphql',
    // link: createUploadLink({ uri: 'http://localhost:4000/graphql' }),
    headers: {
      // authorization: localStorage.getItem('token') || '',
      'client-name': 'GraphQL-Explorer[Client]',
      'client-version': '0.1.0',
    },
  });

  cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      // isLoggedIn: !!localStorage.getItem('token'),
      isLoggedIn: true,
    },
  });

  return client;
}
