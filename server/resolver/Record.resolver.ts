import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";

import Record from "../entity/Record";

@Resolver((of) => Record)
export default class RecordResolver {
  @Query(() => Int)
  async RecordResolverTmp() {
    return 599;
  }
}
