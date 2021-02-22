import { Resolver, FieldResolver, Root } from "type-graphql";

import Record from "../../entities/Record";

import RecordService from "../../services/Record.service";

@Resolver((of) => Record)
export default class RecordFieldResolver {
  constructor(private readonly recordService: RecordService) {}

  // Another Resolver Composite
  @FieldResolver(() => [Record])
  async RecordFieldResolver(@Root() record: Record) {
    const res = await this.recordService.getAllRecords();
    return res;
  }
}
