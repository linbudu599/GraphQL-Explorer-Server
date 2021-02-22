import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";

import Task from "../../entities/Task";

import TaskService from "../../services/Task.service";
import ExecutorService from "../../services/Executor.service";
import SubstanceService from "../../services/Substance.service";

@Resolver((of) => Task)
export default class TaskFieldResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly executorService: ExecutorService,
    private readonly SubstanceService: SubstanceService
  ) {}

  // Another Resolver Composite
  @FieldResolver(() => [Task])
  async TaskFieldResolver(@Root() task: Task) {
    const res = await this.taskService.getAllTasks({
      offset: 0,
      take: 200,
    });
    return res;
  }
}
