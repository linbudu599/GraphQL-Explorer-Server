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

import { ACCOUNT_AUTH, RESPONSE_INDICATOR } from "../utils/constants";
import { InjectCurrentUser, CustomArgsValidation } from "../decorators";

import { ExtraFieldLogMiddlewareGenerator } from "../middleware/log";

import { IContext } from "../typding";

@Resolver((of) => Executor)
export default class ExecutorResolver {
  constructor(
    @InjectRepository(Executor)
    private readonly ExecutorRepository: Repository<Executor>,
    private readonly executorService: ExecutorService
  ) {}

  // 先给个最低权限
  @Authorized(ACCOUNT_AUTH.UN_LOGIN)
  @Query(() => ExecutorStatus)
  @UseMiddleware(ExtraFieldLogMiddlewareGenerator("CHECK ALL ExecutorS"))
  async Executors(
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

  @Query(() => ExecutorStatus)
  async FindExecutorById(@Arg("uid") uid: string): Promise<ExecutorStatus> {
    const Executor = await this.ExecutorRepository.findOne(
      { uid },
      {
        relations: ["tasks"],
      }
    );
    if (!Executor) {
      return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
    }
    return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [Executor]);
  }

  @Query(() => ExecutorStatus)
  @CustomArgsValidation(ExecutorQueryArgs)
  async FindExecutorByConditions(
    @Args({ validate: false }) conditions: ExecutorQueryArgs
  ): Promise<ExecutorStatus> {
    try {
      const res = await this.ExecutorRepository.find({ ...conditions });
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

  @Query(() => ExecutorStatus)
  async FindExecutorByDesc(
    @Args() desc: ExecutorDescQuery,
    @Arg("pagination", { nullable: true })
    pagination: PaginationOptions
  ): Promise<ExecutorStatus> {
    const { cursor, offset } = pagination ?? { cursor: 0, offset: 20 };
    const { level, successRate, satisfaction } = desc;

    const executors = await this.executorService.Executors(cursor!, offset!);
    console.log(desc);
    const filterExecutors = executors.filter((executor) => {
      const descObj = JSON.parse(executor.desc) as IExecutorDesc;
      console.log("descObj");
      console.log(descObj);
      // may by 0
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
  @Mutation(() => ExecutorStatus)
  async CreateExecutor(
    @Arg("newExecutorInfo") Executor: ExecutorCreateInput,
    @TransactionRepository(Executor)
    ExecutorTransRepo: Repository<Executor>
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await this.ExecutorRepository.findOne({
        name: Executor.name,
      });
      if (isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, []);
      }

      const res = await ExecutorTransRepo.save(Executor);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  // 更新UserDesc字段
  @Transaction()
  @Mutation(() => ExecutorStatus, { nullable: true })
  async UpdateExecutorDesc(
    @Arg("uid") uid: string,
    @Arg("userDesc") desc: ExecutorDescUpdateInput,
    @TransactionRepository(Executor)
    ExecutorTransRepo: Repository<Executor>
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await this.ExecutorRepository.findOne(uid);
      if (!isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }
      const updatedDesc = {
        ...JSON.parse(isExistingExecutor?.desc ?? "{}"),
        ...desc,
      };

      const res = await ExecutorTransRepo.update(uid, {
        desc: JSON.stringify(updatedDesc),
      });

      const updatedItem = await this.ExecutorRepository.findOne({
        uid,
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updatedItem]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Transaction()
  @Mutation(() => ExecutorStatus, { nullable: true })
  async UpdateExecutorBasicInfo(
    @Arg("modifiedExecutorInfo") Executor: ExecutorUpdateInput,
    @TransactionRepository(Executor)
    ExecutorTransRepo: Repository<Executor>
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await this.ExecutorRepository.findOne({
        uid: Executor.uid,
      });
      if (!isExistingExecutor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      const res = await ExecutorTransRepo.update(
        { uid: Executor.uid },
        Executor
      );
      const updatedItem = await this.ExecutorRepository.findOne({
        uid: Executor.uid,
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updatedItem]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Transaction()
  @Mutation(() => ExecutorStatus)
  async DeleteExecutor(
    @Arg("uid") uid: string,
    @TransactionRepository(Executor)
    ExecutorTransRepo: Repository<Executor>,
    @TransactionRepository(Task)
    taskTransRepo: Repository<Task>
  ): Promise<ExecutorStatus> {
    try {
      const isExistingExecutor = await ExecutorTransRepo.findOne(uid);
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
        await ExecutorTransRepo.delete(uid);
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

      await ExecutorTransRepo.delete({ uid });
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, []);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @FieldResolver(() => Int)
  async spAgeField(
    @Root() executor: Executor,
    @Arg("param", { nullable: true }) param?: number
  ): Promise<number> {
    // ... do sth addtional here
    return executor.age;
  }

  @FieldResolver(() => ExecutorDesc)
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

  @Query(() => Date)
  async InjectDataFromService() {
    const registerDate = await this.executorService.ContainerRegisterTime();
    return registerDate;
  }
}
