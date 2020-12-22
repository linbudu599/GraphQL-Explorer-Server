import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Repository, Transaction, TransactionRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Task from "../entity/Task";

import {
  PaginationOptions,
  StatusHandler,
  TaskStatus,
} from "../graphql/Common";
import {
  TaskCreateInput,
  TaskUpdateInput,
  TaskRelationsInput,
  getTaskRelations,
} from "../graphql/Task";
import { DifficultyLevel } from "../graphql/Public";

import TaskService from "../service/Task.service";
import ExecutorService from "../service/Executor.service";
import SubstanceService from "../service/Substance.service";

import { RESPONSE_INDICATOR } from "../utils/constants";

@Resolver((of) => Task)
export default class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly executorService: ExecutorService,
    private readonly SubstanceService: SubstanceService
  ) {}

  @Query(() => TaskStatus, { nullable: false, description: "获取所有任务" })
  async QueryAllTasks(
    @Arg("pagination", { nullable: true })
    pagination: PaginationOptions,
    @Arg("relations", (type) => TaskRelationsInput, { nullable: true })
    relationOptions: Partial<TaskRelationsInput> = {}
  ): Promise<TaskStatus> {
    try {
      const queryPagination = (pagination ?? {
        cursor: 0,
        offset: 20,
      }) as Required<PaginationOptions>;

      const relations = getTaskRelations(relationOptions);
      const res = this.taskService.getAllTasks(queryPagination, relations);

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, res);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => TaskStatus, { nullable: false, description: "基于ID获取任务" })
  async QueryTaskByID(
    @Arg("taskId") taskId: string,
    @Arg("relations", (type) => TaskRelationsInput, { nullable: true })
    relationOptions: Partial<TaskRelationsInput> = {}
  ): Promise<TaskStatus> {
    try {
      const relations = getTaskRelations(relationOptions);
      const res = await this.taskService.getOneTaskById(taskId, relations);

      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => TaskStatus, {
    nullable: false,
    description: "查询执行者当前被分配的任务",
  })
  async QueryExecutorTasks(
    @Arg("uid") uid: string,
    @Arg("relations", (type) => TaskRelationsInput, { nullable: true })
    relationOptions: Partial<TaskRelationsInput> = {}
  ) {
    try {
      const executor = await this.executorService.getOneExecutorById(uid);

      if (!executor) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      const relations = getTaskRelations(relationOptions);

      const res = await this.taskService.getTasksByConditions(
        {
          assignee: {
            uid,
          },
        },
        [...relations, "assignee"]
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, res);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, { nullable: false, description: "变更任务状态" })
  async ToggleTaskStatus(@Arg("taskId") taskId: string): Promise<TaskStatus> {
    try {
      const origin = await this.taskService.getOneTaskById(taskId);

      if (!origin)
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);

      await this.taskService.updateTask(
        { taskId },
        {
          taskAccmplished: !origin.taskAccmplished,
        }
      );

      const updatedItem = await this.taskService.getOneTaskById(taskId);

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updatedItem]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  // TODO: 不可删除已指派的任务
  @Mutation(() => TaskStatus, { nullable: false, description: "删除任务" })
  async DeleteTask(@Arg("taskId") taskId: string): Promise<TaskStatus> {
    try {
      const res = await this.taskService.getOneTaskById(taskId);
      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      await this.taskService.deleteTask(taskId);

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, []);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  // TODO: 将事务操作也移到service中
  @Transaction()
  @Mutation(() => TaskStatus, {
    nullable: false,
    description: "创建任务同时关联到实体",
  })
  async CreateNewTask(
    @Arg("taskCreateParam") param: TaskCreateInput,
    @TransactionRepository(Task)
    taskTransRepo: Repository<Task>
  ): Promise<TaskStatus> {
    try {
      const { substanceId } = param;
      const substance = await this.SubstanceService.getOneSubstanceById(
        substanceId
      );
      if (!substance) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }
      if (substance.relatedTaskId) {
        // TODO: 专用标识：实体已关联
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, []);
      }

      const { taskTitle } = param;
      const isTitleUsed = await this.taskService.getOneTaskByConditions(
        {
          taskTitle,
        },
        ["taskSubstance"]
      );
      if (isTitleUsed) {
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, []);
      }
      param.taskSubstance = substance;

      const res = await taskTransRepo.save(param);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, {
    nullable: false,
    description: "变更任务基本信息",
  })
  async UpdateTaskInfo(
    @Arg("taskUpdateParam") param: TaskUpdateInput
  ): Promise<TaskStatus> {
    try {
      const taskExists = await this.taskService.getOneTaskById(param.taskId);
      if (!taskExists) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      await this.taskService.updateTask({ taskId: param.taskId }, param);

      const updatedTask = await this.taskService.getOneTaskById(param.taskId);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updatedTask]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Transaction()
  @Mutation(() => TaskStatus, { nullable: false, description: "指派任务" })
  async AssignTask(
    @Arg("taskId") taskId: string,
    @Arg("uid") uid: string,
    @TransactionRepository(Task)
    taskTransRepo: Repository<Task>
  ): Promise<TaskStatus> {
    try {
      const assignee = await this.executorService.getOneExecutorById(uid);
      if (!assignee) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      const task = await this.taskService.getOneTaskById(taskId, ["assignee"]);
      if (!task) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      if (task.assignee) {
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, [task]);
      }
      task.assignee = assignee;

      const assignRes = await taskTransRepo.save(task);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [assignRes]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, {
    nullable: false,
    description: "变更任务级别",
  })
  async MutateTaskLevel(
    @Arg("taskId") taskId: string,
    @Arg("level", (type) => DifficultyLevel) level: DifficultyLevel
  ): Promise<TaskStatus> {
    try {
      const res = await this.taskService.getOneTaskById(taskId);
      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      await this.taskService.updateTask({ taskId }, { taskLevel: level });

      const updatedTask = await this.taskService.getOneTaskById(taskId);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updatedTask]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => TaskStatus, {
    nullable: false,
    description: "冻结任务 无法恢复",
  })
  async FreezeTask(@Arg("taskId") taskId: string): Promise<TaskStatus> {
    try {
      const res = await this.taskService.getOneTaskById(taskId);
      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      await this.taskService.updateTask({ taskId }, { taskAvaliable: false });

      const updatedTask = await this.taskService.getOneTaskById(taskId);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updatedTask]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }
}
