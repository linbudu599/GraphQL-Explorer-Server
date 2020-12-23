import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  Authorized,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root,
  Int,
} from "type-graphql";
import { Repository, Transaction, TransactionRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Executor, { ExecutorDesc } from "../entity/Executor";
import Task from "../entity/Task";

import ExecutorService from "../service/Executor.service";
import TaskService from "../service/Task.service";

import {
  ExecutorCreateInput,
  ExecutorUpdateInput,
  ExecutorQueryArgs,
  ExecutorDescUpdateInput,
  ExecutorDescQuery,
  IExecutorDesc,
  ExecutorRelationsInput,
  getExecutorRelations,
} from "../graphql/Executor";
import {
  PaginationOptions,
  StatusHandler,
  ExecutorStatus,
} from "../graphql/Common";

import { RESPONSE_INDICATOR } from "../utils/constants";
import { InjectCurrentUser, CustomArgsValidation } from "../decorators";

import { ExtraFieldLogMiddlewareGenerator } from "../middleware/log";

import { IContext } from "../typding";

@Resolver((of) => Executor)
export default class ExecutorResolver {
  constructor(
    @InjectRepository(Executor)
    private readonly executorRepository: Repository<Executor>,

    private readonly executorService: ExecutorService,
    private readonly taskService: TaskService
  ) {}

  @Query(() => ExecutorStatus, {
    nullable: false,
    description: "获取所有执行者",
  })
  @UseMiddleware(ExtraFieldLogMiddlewareGenerator("Check All ExecutorS"))
  async QueryAllExecutors(
    @Ctx() ctx: IContext,
    @InjectCurrentUser() user: IContext["currentUser"],

    @Arg("pagination", { nullable: true })
    pagination: PaginationOptions,

    @Arg("relations", (type) => ExecutorRelationsInput, { nullable: true })
    relationOptions: Partial<ExecutorRelationsInput> = {}
  ): Promise<ExecutorStatus> {
    try {
      const { cursor, offset } = (pagination ?? {
        cursor: 0,
        offset: 20,
      }) as Required<PaginationOptions>;
      const relations = getExecutorRelations(relationOptions);

      const ExecutorsWithTasks = await this.executorService.getAllExecutors(
        cursor,
        offset,
        relations
      );

      return new StatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        ExecutorsWithTasks
      );
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => ExecutorStatus, {
    nullable: false,
    description: "查找特定执行者",
  })
  async QueryExecutorById(
    @Arg("uid") uid: string,

    @Arg("relations", (type) => ExecutorRelationsInput, { nullable: true })
    relationOptions: Partial<ExecutorRelationsInput> = {}
  ): Promise<ExecutorStatus> {
    try {
      const relations = getExecutorRelations(relationOptions);
      const executor = await this.executorService.getOneExecutorById(
        uid,
        relations
      );

      if (!executor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [executor]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => ExecutorStatus, {
    nullable: false,
    description: "根据基本条件查找执行者",
  })
  @CustomArgsValidation(ExecutorQueryArgs)
  async QueryExecutorByConditions(
    @Args({ validate: false }) conditions: ExecutorQueryArgs,

    @Arg("relations", (type) => ExecutorRelationsInput, { nullable: true })
    relationOptions: Partial<ExecutorRelationsInput> = {}
  ): Promise<ExecutorStatus> {
    try {
      const relations = getExecutorRelations(relationOptions);

      const res = await this.executorService.getExecutorsByConditions(
        conditions,
        relations
      );

      const isEmpty = res.length === 0;

      return new StatusHandler(
        !isEmpty,
        isEmpty ? RESPONSE_INDICATOR.NOT_FOUND : RESPONSE_INDICATOR.SUCCESS,
        res
      );
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => ExecutorStatus, {
    nullable: false,
    description: "根据描述（等级、成功率、评分）查找执行者",
  })
  async QueryExecutorByDesc(
    @Args() desc: ExecutorDescQuery,
    @Arg("pagination", { nullable: true })
    pagination: PaginationOptions,

    @Arg("relations", (type) => ExecutorRelationsInput, { nullable: true })
    relationOptions: Partial<ExecutorRelationsInput> = {}
  ): Promise<ExecutorStatus> {
    const relations = getExecutorRelations(relationOptions);
    const { cursor, offset } = (pagination ?? {
      cursor: 0,
      offset: 20,
    }) as Required<PaginationOptions>;

    const { level, successRate, satisfaction } = desc;

    const executors = await this.executorService.getAllExecutors(
      cursor,
      offset,
      relations
    );

    const filterExecutors = executors.filter((executor) => {
      const descObj = JSON.parse(executor.desc) as IExecutorDesc;

      const levelEqual =
        typeof level === "undefined" ? true : descObj.level === level;

      const successRateEqual =
        typeof successRate === "undefined"
          ? true
          : descObj.successRate === successRate;

      const satisfactionEqual =
        typeof satisfaction === "undefined"
          ? true
          : descObj.satisfaction === satisfaction;

      return levelEqual && successRateEqual && satisfactionEqual;
    });

    return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, filterExecutors);
  }

  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: "添加执行者",
  })
  async CreateExecutor(
    @Arg("newExecutorInfo") executor: ExecutorCreateInput
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await this.executorService.getOneExecutorByConditions(
        {
          name: executor.name,
        }
      );
      if (isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, []);
      }

      const res = await this.executorService.createExecutor(executor);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: "更新执行者描述",
  })
  async UpdateExecutorDesc(
    @Arg("uid") uid: string,
    @Arg("userDesc") desc: ExecutorDescUpdateInput
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await this.executorService.getOneExecutorById(
        uid
      );

      if (!isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      const updatedDesc = {
        ...JSON.parse(isExistingExecutor.desc ?? "{}"),
        ...desc,
      };

      const res = await this.executorService.updateExecutor(uid, {
        desc: JSON.stringify(updatedDesc),
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: "更新执行者基本信息",
  })
  async UpdateExecutorBasicInfo(
    @Arg("modifiedExecutorInfo") executor: ExecutorUpdateInput
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await this.executorService.getOneExecutorById(
        executor.uid
      );
      if (!isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      const res = await this.executorService.updateExecutor(
        executor.uid,
        executor
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Transaction()
  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: "删除执行者",
  })
  async DeleteExecutor(
    @Arg("uid") uid: string,
    @TransactionRepository(Executor)
    executorTransRepo: Repository<Executor>,
    @TransactionRepository(Task)
    taskTransRepo: Repository<Task>
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await this.executorService.getOneExecutorById(
        uid
      );
      if (!isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      const hasAssignedTask = await this.taskService.getTasksByConditions({
        assignee: {
          uid,
        },
      });

      if (!hasAssignedTask) {
        await this.executorService.deleteExecutor(uid);
      } else {
        // TODO:
        await taskTransRepo.update(
          {
            assignee: {
              uid,
            },
          },
          {
            assignee: undefined,
          }
        );
      }

      await executorTransRepo.delete({ uid });
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, []);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @FieldResolver(() => Int, { nullable: false, description: "字段级解析器" })
  async spAgeField(
    @Root() executor: Executor,
    @Arg("param", { nullable: true }) param?: number
  ): Promise<number> {
    // ... do sth addtional here
    return executor.age ?? 990;
  }

  @FieldResolver(() => ExecutorDesc, {
    nullable: false,
    description: "获取对象类型的执行者描述",
  })
  async ExecutorDescField(
    @Root() executor: Executor
  ): Promise<ExecutorDesc | null> {
    const { desc } = executor;
    try {
      return JSON.parse(desc);
    } catch (err) {
      return null;
    }
  }
}
