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

import {
  ExecutorCreateInput,
  ExecutorUpdateInput,
  ExecutorQueryArgs,
  ExecutorDescUpdateInput,
  ExecutorDescQuery,
  IExecutorDesc,
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
    private readonly executorService: ExecutorService
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
    pagination: PaginationOptions
  ): Promise<ExecutorStatus> {
    try {
      const { cursor, offset } = pagination ?? { cursor: 0, offset: 20 };
      const ExecutorsWithTasks = await this.executorService.Executors(
        cursor!,
        offset!
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
  async QueryExecutorById(@Arg("uid") uid: string): Promise<ExecutorStatus> {
    const executor = await this.executorRepository.findOne(
      { uid },
      {
        relations: ["tasks"],
      }
    );
    if (!executor) {
      return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
    }
    return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [executor]);
  }

  @Query(() => ExecutorStatus, {
    nullable: false,
    description: "根据基本条件查找执行者",
  })
  @CustomArgsValidation(ExecutorQueryArgs)
  async QueryExecutorByConditions(
    @Args({ validate: false }) conditions: ExecutorQueryArgs
  ): Promise<ExecutorStatus> {
    try {
      const res = await this.executorRepository.find({ ...conditions });
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
    pagination: PaginationOptions
  ): Promise<ExecutorStatus> {
    const { cursor, offset } = pagination ?? { cursor: 0, offset: 20 };
    const { level, successRate, satisfaction } = desc;

    const executors = await this.executorService.Executors(cursor!, offset!);
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

  @Transaction()
  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: "添加执行者",
  })
  async CreateExecutor(
    @Arg("newExecutorInfo") Executor: ExecutorCreateInput,
    @TransactionRepository(Executor)
    executorTransRepo: Repository<Executor>
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await this.executorRepository.findOne({
        name: Executor.name,
      });
      if (isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, []);
      }

      const res = await executorTransRepo.save(Executor);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Transaction()
  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: "更新执行者描述",
  })
  async UpdateExecutorDesc(
    @Arg("uid") uid: string,
    @Arg("userDesc") desc: ExecutorDescUpdateInput,
    @TransactionRepository(Executor)
    executorTransRepo: Repository<Executor>
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await this.executorRepository.findOne(uid);
      if (!isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }
      const updatedDesc = {
        ...JSON.parse(isExistingExecutor?.desc ?? "{}"),
        ...desc,
      };

      const res = await executorTransRepo.update(uid, {
        desc: JSON.stringify(updatedDesc),
      });

      const updatedItem = await this.executorRepository.findOne({
        uid,
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updatedItem]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Transaction()
  @Mutation(() => ExecutorStatus, {
    nullable: false,
    description: "更新执行者基本信息",
  })
  async UpdateExecutorBasicInfo(
    @Arg("modifiedExecutorInfo") Executor: ExecutorUpdateInput,
    @TransactionRepository(Executor)
    executorTransRepo: Repository<Executor>
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await this.executorRepository.findOne({
        uid: Executor.uid,
      });
      if (!isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      const res = await executorTransRepo.update(
        { uid: Executor.uid },
        Executor
      );
      const updatedItem = await this.executorRepository.findOne({
        uid: Executor.uid,
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updatedItem]);
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
      const isExistingExecutor = await executorTransRepo.findOne(uid);
      if (!isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }
      // TODO: 抽离到Task.service中
      const hasAssignedTask = await taskTransRepo.find({
        where: {
          assignee: {
            uid,
          },
        },
      });

      if (!hasAssignedTask) {
        await executorTransRepo.delete(uid);
      } else {
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
