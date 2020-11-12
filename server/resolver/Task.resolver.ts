import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import User from "../entity/User";
import Task from "../entity/Task";

import StatusHandler, { Status } from "../graphql/Status";
import { TaskCreateInput, TaskUpdateInput } from "../graphql/Task";

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

  @Mutation(() => Task)
  async CreateNewTask(
    @Arg("taskCreateParam") param: TaskCreateInput
  ): Promise<Task> {
    const result = await this.taskRepository.save(param);
    return result;
  }

  // TODO: Status -> TaskStatus / UserStatus
  @Mutation(() => Status)
  async UpdateTaskInfo(
    @Arg("taskUpdateParam") param: TaskUpdateInput
  ): Promise<Status> {
    const result = await this.taskRepository.update(param.taskId, param);
    console.log(result);
    return new StatusHandler(true, "Success");
  }

  @Mutation(() => Status)
  async AssignTask(
    @Arg("taskId") taskId: string,
    @Arg("uid") uid: string
    // TODO: handle status
  ): Promise<any> {
    const assignee = await this.userRepository.findOne({ uid });
    const task = await this.taskRepository.findOne(
      {
        taskId,
      },
      {
        relations: ["assignee"],
      }
    );

    // if (task?.assignee) {
    //   return new StatusHandler(false, "Assigned");
    // }
    task!.assignee = assignee;

    const assign = await this.taskRepository.save(task!);
    return assign;
  }
}
