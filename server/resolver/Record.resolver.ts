import { Resolver, Query, Arg } from "type-graphql";

import Record from "../entity/Record";

import { RecordStatus, StatusHandler } from "../graphql/Common";
import { RecordRelationsInput, getRecordRelations } from "../graphql/Record";

import RecordService from "../service/Record.service";

import { RESPONSE_INDICATOR } from "../utils/constants";

@Resolver((of) => Record)
export default class RecordResolver {
  constructor(private readonly recordService: RecordService) {}

  @Query(() => RecordStatus)
  async QueryAllRecords(
    @Arg("relations", (type) => RecordRelationsInput, { nullable: true })
    relationOptions: Partial<RecordRelationsInput> = {}
  ): Promise<RecordStatus> {
    try {
      const relations = getRecordRelations(relationOptions);
      const records = await this.recordService.getAllRecords(relations);

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, records);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => RecordStatus)
  async QueryRecordById(
    @Arg("recordId", { nullable: false }) recordId: string,
    @Arg("relations", (type) => RecordRelationsInput, { nullable: true })
    relationOptions: Partial<RecordRelationsInput> = {}
  ): Promise<RecordStatus> {
    try {
      const relations = getRecordRelations(relationOptions);
      const record = await this.recordService.getOneRecordById(
        recordId,
        relations
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [record]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }
}
