import { Resolver, Query, Arg } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Executor from "../entity/Executor";
import Task from "../entity/Task";

import ExecutorService from "../service/Executor.service";
import PublicService from "../service/Public.service";

import { IExecutorDesc } from "../graphql/Executor";
import { PaginationOptions, PrimitiveStatus } from "../graphql/Common";
import { LevelQueryResult, DifficultyLevel } from "../graphql/Public";

@Resolver((of) => PrimitiveStatus)
export default class PublicResolver {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly executorService: ExecutorService,
    private readonly publicService: PublicService
  ) {}

  @Query(() => [LevelQueryResult])
  async QueryByDifficultyLevel(
    @Arg("difficulty", (type) => DifficultyLevel, { nullable: true })
    difficulty: DifficultyLevel,
    @Arg("pagination", { nullable: true })
    pagination: PaginationOptions
  ): Promise<(Executor | Task)[]> {
    const { cursor, offset } = pagination ?? { cursor: 0, offset: 20 };

    const executors = await this.executorService.Executors(cursor!, offset!);
    // TODO: Task Service
    const tasks = await this.taskRepository.find({
      skip: cursor,
      take: offset,
      relations: ["assignee"],
    });

    if (typeof difficulty === "undefined") {
      return [...executors, ...tasks];
    }

    const filterExecutors = executors.filter(
      (executor) =>
        (JSON.parse(executor.desc) as IExecutorDesc).level === difficulty
    );

    const filterTasks = tasks.filter((task) => task.taskLevel === difficulty);

    return [...filterExecutors, ...filterTasks];
  }

  @Query(() => Date)
  async ContainerRegisterTime() {
    const registerDate = await this.publicService.ContainerRegisterTime();
    return registerDate;
  }
}
