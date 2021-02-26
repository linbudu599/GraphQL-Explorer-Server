import { Resolver, FieldResolver, Root, Ctx } from "type-graphql";

import Executor from "../../entities/Executor";
import Task from "../../entities/Task";

import { IContext } from "../../typing";

@Resolver((of) => Executor)
export default class ExecutorFieldResolver {
  @FieldResolver(() => [Task])
  async ExecutorInnerTaskFieldResolver(
    @Root() executor: Executor,
    @Ctx() ctx: IContext
  ) {
    return await ctx.dataLoader.loaders.Executor.tasks.load(executor);
  }
}
