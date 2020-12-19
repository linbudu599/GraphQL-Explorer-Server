import { Resolver, Query, Arg } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { RecordStatus, StatusHandler } from "../graphql/Common";

import Record from "../entity/Record";
import {
  RecordRelationsInput,
  RecordRelations,
  getRecordRelations,
} from "../graphql/Record";

import { RESPONSE_INDICATOR } from "../utils/constants";

@Resolver((of) => Record)
export default class RecordResolver {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>
  ) {}

  @Query(() => RecordStatus)
  async QueryAllRecords(
    @Arg("relations", { nullable: true }) relationOptions: RecordRelationsInput
  ): Promise<RecordStatus> {
    try {
      const relations = getRecordRelations(relationOptions);

      const records = await this.recordRepository.find({
        relations,
      });
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, records);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }
}
