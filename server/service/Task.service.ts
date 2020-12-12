import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Task from "../entity/Task";

import { PaginationOptions } from "../graphql/Common";
import { TaskRelation } from "../graphql/Task";

export interface ITaskService {
  getAllTasks(
    pagination: Required<PaginationOptions>,
    relations: TaskRelation[]
  ): Promise<Task[]>;
}

@Service()
export default class TaskService implements ITaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async getAllTasks(
    pagination: Required<PaginationOptions>,
    relations: TaskRelation[]
  ): Promise<Task[]> {
    const { cursor, offset } = pagination;

    const res = await this.taskRepository.find({
      skip: cursor,
      take: offset,
      relations,
    });

    return res;
  }
}
