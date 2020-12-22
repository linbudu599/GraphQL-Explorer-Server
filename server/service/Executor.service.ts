import { FindConditions, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Service, Inject } from "typedi";

import Executor from "../entity/Executor";

import { PaginationOptions } from "../graphql/Common";
import { ExecutorRelation, IExecutor } from "../graphql/Executor";

export interface IExecutorService {
  getAllExecutors(
    cursor: number,
    offset: number,
    relations: ExecutorRelation[]
  ): Promise<Executor[]>;

  getOneExecutorById(
    uid: string,
    relations: ExecutorRelation[]
  ): Promise<Executor | undefined>;

  getOneExecutorByConditions(
    conditions: Partial<IExecutor>,
    relations: ExecutorRelation[]
  ): Promise<Executor | undefined>;

  getExecutorsByConditions(
    conditions: FindConditions<Executor>,
    relations: ExecutorRelation[]
  ): Promise<Executor[]>;
}

@Service()
export default class ExecutorService implements IExecutorService {
  constructor(
    @InjectRepository(Executor)
    private readonly executorRepository: Repository<Executor>,
    @Inject("INIT_INJECT_DATA") private readonly dateInfo: Date
  ) {}

  async getAllExecutors(
    cursor: number,
    offset: number,
    relations: ExecutorRelation[] = []
  ) {
    const res = await this.executorRepository.find({
      relations,
      skip: cursor,
      take: offset,
    });

    return res;
  }

  async getOneExecutorById(
    uid: string,
    relations: ExecutorRelation[] = []
  ): Promise<Executor | undefined> {
    const res = await this.executorRepository.findOne(uid, {
      relations,
    });

    return res;
  }

  async getOneExecutorByConditions(
    conditions: Partial<IExecutor>,
    relations: ExecutorRelation[] = []
  ): Promise<Executor | undefined> {
    const res = await this.executorRepository.findOne(conditions, {
      relations,
    });

    return res;
  }

  async getExecutorsByConditions(
    conditions: FindConditions<Executor>,
    relations: ExecutorRelation[] = []
  ): Promise<Executor[]> {
    const res = await this.executorRepository.find({
      where: {
        ...conditions,
      },
      relations: Array.from(new Set(relations)),
    });

    return res;
  }
}
