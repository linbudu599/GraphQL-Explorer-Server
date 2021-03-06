import { Resolver, Query, Arg } from "type-graphql";

import Executor from "../entities/Executor";
import Task from "../entities/Task";

import ExecutorService from "../services/Executor.service";
import PublicService from "../services/Public.service";
import TaskService from "../services/Task.service";
import SubstanceService from "../services/Substance.service";

import { IExecutorDesc } from "../graphql/Executor";
import { PaginationOptions, PrimitiveStatus } from "../graphql/Common";
import { LevelQueryResult, DifficultyLevel } from "../graphql/Public";

import { DEFAULT_QUERY_PAGINATION } from "../utils/constants";

@Resolver((of) => PrimitiveStatus)
export default class PublicResolver {
  constructor(
    private readonly executorService: ExecutorService,
    private readonly taskService: TaskService,
    private readonly publicService: PublicService,
    private readonly substanceService: SubstanceService
  ) {}

  @Query(() => [LevelQueryResult], {
    nullable: false,
    description: "基于级别获取所有执行者与任务",
  })
  async QueryByDifficultyLevel(
    @Arg("difficulty", (type) => DifficultyLevel, { nullable: true })
    difficulty: DifficultyLevel,

    @Arg("pagination", { nullable: true })
    pagination: PaginationOptions
  ): Promise<(Executor | Task)[]> {
    const queryPagination = (pagination ??
      DEFAULT_QUERY_PAGINATION) as Required<PaginationOptions>;

    const executors = await this.executorService.getAllExecutors(
      queryPagination,
      ["tasks"]
    );

    const tasks = await this.taskService.getAllTasks(queryPagination, [
      "assignee",
      "taskSubstance",
    ]);

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

  @Query(() => Date, { nullable: false, description: "容器注册时间" })
  async ContainerRegisterTime() {
    const registerDate = await this.publicService.ContainerRegisterTime();

    return registerDate;
  }
}
