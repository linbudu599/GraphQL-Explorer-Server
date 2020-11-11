import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  Authorized,
  UseMiddleware,
} from "type-graphql";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import User from "../entity/User";
import Task from "../entity/Task";

import { Status, StatusHandler } from "../graphql/Status";
import {
  UserCreateInput,
  UserUpdateInput,
  UserQueryArgs,
} from "../graphql/User";

import { ACCOUNT_AUTH } from "../utils/constants";

import { LogAccessMiddleware } from "../middleware/log";

@Resolver((of) => Task)
export default class TaskResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  @Query(() => [Task]!)
  async Tasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  @Query(() => Task)
  async GetTaskByID(@Arg("taskId") taskId: number): Promise<Task | null> {
    const result =
      (await this.taskRepository.findOne({
        where: {
          taskId,
        },
      })) ?? null;

    return result;
  }

  @Query(() => Task)
  async ToggleTaskStatus(@Arg("taskId") taskId: number): Promise<Task | null> {
    const origin = await this.taskRepository.findOne({ where: { taskId } });
    if (!origin) return null;

    const updateRes = await this.taskRepository.update(taskId, {
      taskStatus: !origin.taskStatus,
    });

    return (await this.taskRepository.findOne({ where: { taskId } })) ?? null;
  }

  @Query(() => User)
  async QueryTaskAssignee(@Arg("taskId") taskId: number): Promise<User | null> {
    const taskDetail = await this.taskRepository.findOne({
      where: {
        taskId,
      },
      relations: ["assignee"],
    });

    if (!taskDetail) return null;

    return taskDetail.assignee ?? null;
  }

  @Query(() => [Task]!)
  async QueryUserTasks(@Arg("uid") uid: number) {
    const res = await this.taskRepository.find({
      where: {
        assignee: {
          uid,
        },
      },
    });
    return res;
  }

  // TODO: return status
  @Query(() => Task)
  async DeleteTask(@Arg("taskId") taskId: number): Promise<Task | null> {
    const taskDetail = await this.taskRepository.findOne({
      where: {
        taskId,
      },
    });
    if (!taskDetail) return null;

    await this.taskRepository.delete(taskId);

    return taskDetail ?? null;
  }
}
