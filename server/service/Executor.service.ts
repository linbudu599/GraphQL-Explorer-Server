import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Executor from "../entity/Executor";

import { Service, Inject } from "typedi";

export interface IExecutorService {
  // Query
  Executors(cursor: number, offset: number): Promise<Executor[]>;
}

@Service()
export default class ExecutorService implements IExecutorService {
  constructor(
    @InjectRepository(Executor)
    private readonly executorRepository: Repository<Executor>,
    @Inject("INIT_INJECT_DATA") private readonly dateInfo: Date
  ) {}

  async Executors(cursor: number, offset: number) {
    const ExecutorsWithTasks = await this.executorRepository.find({
      relations: ["tasks"],
      skip: cursor,
      take: offset,
    });

    return ExecutorsWithTasks;
  }
}
