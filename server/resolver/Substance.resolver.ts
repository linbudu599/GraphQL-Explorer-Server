import { Resolver, Query, Arg } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Substance from "../entity/Substance";

import { PaginationOptions } from "../graphql/Common";
import { StatusHandler, SubstanceStatus } from "../graphql/Common";

import { RESPONSE_INDICATOR } from "../utils/constants";

@Resolver((of) => Substance)
export default class SubstanceResolver {
  constructor(
    @InjectRepository(Substance)
    private readonly substanceRepository: Repository<Substance>
  ) {}

  // TODO: status handler
  // FIXME: handle status wrapper by middleware?
  @Query(() => SubstanceStatus)
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
}
