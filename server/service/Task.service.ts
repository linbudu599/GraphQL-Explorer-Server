import { Service } from "typedi";
import { FindConditions, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Task from "../entity/Task";

import { PaginationOptions } from "../graphql/Common";
import {
  ITask,
  TaskCreateInput,
  TaskRelation,
  TaskUpdateInput,
} from "../graphql/Task";

export interface ITaskService {
  getAllTasks(
    pagination: Required<PaginationOptions>,
    relations: TaskRelation[]
  ): Promise<Task[]>;
  getOneTaskById(
    taskId: number,
    relations: TaskRelation[]
  ): Promise<Task | undefined>;
  getOneTaskByConditions(
    conditions: Partial<ITask>,
    relations: TaskRelation[]
  ): Promise<Task | undefined>;
  getTasksByConditions(
    conditions: FindConditions<Task>,
    relations: TaskRelation[]
  ): Promise<Task[]>;

  createTask(task: TaskCreateInput | Task): Promise<Task>;
  updateTask(
    indicator: number,
    infoUpdate: Partial<TaskUpdateInput>
  ): Promise<Task>;
  deleteTask(taskId: number): Promise<void>;
}

@Service()
export default class TaskService implements ITaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async getAllTasks(
    pagination: Required<PaginationOptions>,
    relations: TaskRelation[] = []
  ): Promise<Task[]> {
    const { cursor, offset } = pagination;

    const res = await this.taskRepository.find({
      skip: cursor,
      take: offset,
      relations,
    });

    return res;
  }

  async getOneTaskById(
    taskId: number,
    relations: TaskRelation[] = []
  ): Promise<Task | undefined> {
    const res = await this.taskRepository.findOne(taskId, {
      relations,
    });

    console.log(res);

    return res;
  }

  async getOneTaskByConditions(
    conditions: Partial<ITask>,
    relations: TaskRelation[] = []
  ): Promise<Task | undefined> {
    const res = await this.taskRepository.findOne(conditions, {
      relations,
    });

    return res;
  }

  async getTasksByConditions(
    conditions: FindConditions<Task>,
    relations: TaskRelation[] = []
  ): Promise<Task[]> {
    const res = await this.taskRepository.find({
      where: {
        ...conditions,
      },
      relations: Array.from(new Set(relations)),
    });

    return res;
  }

  async createTask(task: TaskCreateInput | Task): Promise<Task> {
    const res = await this.taskRepository.save(task);
    return res;
  }

  async updateTask(
    indicator: number,
    infoUpdate: Partial<TaskUpdateInput>
  ): Promise<Task> {
    await this.taskRepository.update(indicator, infoUpdate);

    const updatedItem = (await this.taskRepository.findOne(indicator)) as Task;

    return updatedItem;
  }

  async deleteTask(taskId: number): Promise<void> {
    await this.taskRepository.delete(taskId);
  }
}
