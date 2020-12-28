import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";
import { Transaction } from "typeorm";

import Substance from "../entity/Substance";

import {
  PaginationOptions,
  StatusHandler,
  SubstanceStatus,
} from "../graphql/Common";

import {
  SubstanceRelation,
  getSubstanceRelations,
  SubstanceRelationsInput,
} from "../graphql/Substance";

import { RESPONSE_INDICATOR } from "../utils/constants";

import SubstanceService from "../service/Substance.service";

@Resolver((of) => Substance)
export default class SubstanceResolver {
  constructor(private readonly substancesService: SubstanceService) {}

  @Query(() => SubstanceStatus, {
    nullable: false,
    description: "查找所有实体信息",
  })
  async QueryAllSubstances(
    @Arg("pagination", { nullable: true })
    pagination: PaginationOptions,

    @Arg("relations", (type) => SubstanceRelationsInput, { nullable: true })
    relationOptions: Partial<SubstanceRelationsInput> = {}
  ): Promise<SubstanceStatus> {
    try {
      const queryPagination = (pagination ?? {
        cursor: 0,
        offset: 20,
      }) as Required<PaginationOptions>;

      const relations: SubstanceRelation[] = getSubstanceRelations(
        relationOptions
      );

      const res = await this.substancesService.getAllSubstances(
        queryPagination,
        relations
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, res);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => SubstanceStatus, {
    nullable: false,
    description: "基于ID查找实体",
  })
  async QuerySubstanceById(
    @Arg("substanceId", (type) => Int) substanceId: number,

    @Arg("relations", (type) => SubstanceRelationsInput, { nullable: true })
    relationOptions: Partial<SubstanceRelationsInput> = {}
  ): Promise<SubstanceStatus> {
    try {
      const relations: SubstanceRelation[] = getSubstanceRelations(
        relationOptions
      );

      const res = await this.substancesService.getOneSubstanceById(
        substanceId,
        relations
      );

      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
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

  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: "变更实体收容状态",
  })
  async ToggleSubstanceAsylume(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

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

  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: "仅新增实体",
  })
  async CreateSubstanceOnly(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: "变更实体基本信息",
  })
  async MutateSubstanceInfo(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: "变更实体威胁级别",
  })
  async MutateSubstanceLevel(): Promise<SubstanceStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }
}
