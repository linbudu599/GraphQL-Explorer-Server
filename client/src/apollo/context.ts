import { ApolloCache } from '@apollo/client';

export default interface IApolloContext {
  cache: ApolloCache<any>;
}
