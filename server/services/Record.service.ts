import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Record from "../entities/Record";
import { RecordRelations } from "../graphql/Record";

export interface IRecordService {
  getAllRecords(relations: RecordRelations[]): Promise<Record[]>;
}

@Service()
export default class RecordService implements IRecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>
  ) {}

  async getAllRecords(relations: RecordRelations[] = []): Promise<Record[]> {
    const records = await this.recordRepository.find({ relations });
    return records;
  }

  async getOneRecordById(
    recordId: number,
    relations: RecordRelations[] = []
  ): Promise<Record | undefined> {
    const records = await this.recordRepository.findOne(recordId, {
      relations,
    });
    return records;
  }
}
