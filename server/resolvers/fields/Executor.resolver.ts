import { Resolver, FieldResolver, Root } from "type-graphql";

import Executor from "../../entities/Executor";
import ExecutorService from "../../services/Executor.service";

@Resolver((of) => Executor)
export default class ExecutorFieldResolver {
  constructor(private readonly executorService: ExecutorService) {}

  // Another Resolver Composite
  @FieldResolver(() => [Executor])
  async ExecutorFieldResolver(
    @Root() executor: Executor
    // TODO: get by conditions
    // @Arg("executorQueryArgs", { nullable: true}) executorQueryArgs: ExecutorQueryArgs
  ) {
    const res = await this.executorService.getAllExecutors({
      offset: 0,
      take: 200,
    });
    return res;
  }
}
