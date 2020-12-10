import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Repository, Transaction, TransactionRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Substance from "../entity/Substance";

import { PaginationOptions } from "../graphql/Common";
import { StatusHandler, SubstanceStatus } from "../graphql/Common";

import { RESPONSE_INDICATOR } from "../utils/constants";

// TODO: 可选是否联查任务信息
@Resolver((of) => Substance)
export default class SubstanceResolver {
  constructor(
    @InjectRepository(Substance)
    private readonly substanceRepository: Repository<Substance>
  ) {}

  @Query(() => SubstanceStatus, {
    nullable: false,
    description: "查找所有实体信息",
  })
  async QueryAllSubstances(
    @Arg("pagination", { nullable: true })
    pagination: PaginationOptions
  ): Promise<SubstanceStatus> {
    try {
      const { cursor, offset } = pagination ?? { cursor: 0, offset: 20 };

      const res = await this.substanceRepository.find({
        skip: cursor,
        take: offset,
        relations: ["relatedTask"],
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, res);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => SubstanceStatus, {
    nullable: false,
    description: "基于ID查找实体",
  })
  async QuerySubstanceById(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Query(() => SubstanceStatus, {
    nullable: false,
    description: "基于条件查找实体",
  })
  async QuerySubstanceByConditions(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Query(() => SubstanceStatus, {
    nullable: false,
    description: "基于威胁级别查找实体",
  })
  async QuerySubstanceByLevel(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Transaction()
  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: "变更实体收容状态",
  })
  async ToggleSubstanceAsylume(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Transaction()
  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: "变更实体存活状态",
  })
  async ToggleSubstanceAlive(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Transaction()
  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: "新增实体，同时新增任务",
  })
  async CreateSubstanceAndTask(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Transaction()
  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: "仅新增实体",
  })
  async CreateSubstanceOnly(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Transaction()
  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: "变更实体基本信息",
  })
  async MutateSubstanceInfo(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Transaction()
  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: "变更实体威胁级别",
  })
  async MutateSubstanceLevel(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }
}
