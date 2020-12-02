import { Resolver, Query, Arg } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Executor from "../entity/Executor";
import Task from "../entity/Task";

import ExecutorService from "../service/Executor.service";

import { IExecutorDesc } from "../graphql/Executor";
import { PaginationOptions } from "../graphql/Common";
import { LevelQueryResult, DifficultyLevel } from "../graphql/Public";

@Resolver((of) => Executor)
export default class ExecutorResolver {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly ExecutorService: ExecutorService
  ) {}

  // TODO: remove to Public.resolver.ts
  @Query(() => [LevelQueryResult])
  async QueryByDifficultyLevel(
    @Arg("difficulty", (type) => DifficultyLevel, { nullable: true })
    difficulty: DifficultyLevel,
    @Arg("pagination", { nullable: true })
    pagination: PaginationOptions
  ): Promise<(Executor | Task)[]> {
    const { cursor, offset } = pagination ?? { cursor: 0, offset: 20 };

    const Executors = await this.ExecutorService.Executors(cursor!, offset!);
    // TODO: Task Service
    const tasks = await this.taskRepository.find({
      skip: cursor,
      take: offset,
      relations: ["assignee"],
    });

    if (typeof difficulty === "undefined") {
      return [...Executors, ...tasks];
    }

    const filterExecutors = Executors.filter(
      (Executor) =>
        (JSON.parse(Executor.desc) as IExecutorDesc).level === difficulty
    );

    const filterTasks = tasks.filter((task) => task.taskLevel === difficulty);

    return [...filterExecutors, ...filterTasks];
  }
}
