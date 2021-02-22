import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Int,
  FieldResolver,
  Root,
} from "type-graphql";

import Substance from "../../entities/Substance";

import SubstanceService from "../../services/Substance.service";
import TaskService from "../../services/Task.service";

@Resolver((of) => Substance)
export default class SubstanceFieldResolver {
  constructor(
    private readonly substancesService: SubstanceService,
    private readonly taskService: TaskService
  ) {}

  @FieldResolver(() => [])
  async SubstanceFieldResolver(
    @Root() substance: Substance
    // TODO: get by conditions
    // @Arg("executorQueryArgs", { nullable: true}) executorQueryArgs: ExecutorQueryArgs
  ) {
    const res = await this.substancesService.getAllSubstances({
      offset: 0,
      take: 200,
    });
    return res;
  }
}
