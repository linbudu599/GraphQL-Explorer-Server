import { gql, ApolloCache } from '@apollo/client';

import { Resolver, Mutation, Ctx } from 'type-graphql';
import ApolloContext from '../../apollo/context';
import CounterType from './counter.type';

@Resolver((of) => CounterType)
export default class CounterResolver {
  private updateCounter(
    cache: ApolloCache<any>,
    getNewValueCb: (value: number) => number
  ) {
    const query = gql`
      query {
        counter @client {
          __typename
          value
        }
      }
    `;
    const { counter } = cache.readQuery<{ counter: CounterType }>({ query })!;
    const data = {
      counter: {
        ...counter,
        value: getNewValueCb(counter.value),
      },
    };
    cache.writeQuery({ query, data });
  }

  @Mutation(() => Boolean, { nullable: true })
  incrementCounter(@Ctx() { cache }: ApolloContext) {
    this.updateCounter(cache, (value) => value + 1);
  }

  @Mutation(() => Boolean, { nullable: true })
  decrementCounter(@Ctx() { cache }: ApolloContext) {
    this.updateCounter(cache, (value) => Math.max(value - 1, 0));
  }
}
