import { Service } from "typedi";
import { Repository, SelectQueryBuilder } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Substance from "../entity/Substance";

import { PaginationOptions } from "../graphql/Common";
import {
  SubstanceRelation,
  SubstanceQueryInput,
  SubstanceCreateInput,
  SubstanceUpdateInput,
} from "../graphql/Substance";

export interface ISubstanceService {
  getAllSubstances(
    pagination: Required<PaginationOptions>,
    relations: SubstanceRelation[]
  ): Promise<Substance[]>;

  getOneSubstanceById(
    substanceId: number,
    relations: SubstanceRelation[]
  ): Promise<Substance | undefined>;

  getOneSubstanceByConditions(
    conditions: SubstanceQueryInput,
    relations: SubstanceRelation[]
  ): Promise<Substance | undefined>;

  getSubstancesByConditions(
    conditions: SubstanceQueryInput,
    pagination: Required<PaginationOptions>,
    relations: SubstanceRelation[]
  ): Promise<Substance[]>;

  createSubstance(
    substance: SubstanceCreateInput | Substance
  ): Promise<Substance>;
  updateSubstance(
    indicator: number,
    infoUpdate: SubstanceUpdateInput
  ): Promise<Substance>;
  deleteSubstance(sId: number): Promise<void>;
}

@Service()
export default class SubstanceService implements ISubstanceService {
  constructor(
    @InjectRepository(Substance)
    private readonly substanceRepository: Repository<Substance>
  ) {}

  private generateSelectBuilder(relations: SubstanceRelation[]) {
    let selectQueryBuilder = this.substanceRepository.createQueryBuilder(
      "substance"
    );

    if (relations.includes("relatedRecord")) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        "substance.relatedRecord",
        "relatedRecord"
      );
    }
    if (relations.includes("relatedTask")) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        "substance.relatedTask",
        "task"
      );
    }

    // 任务 >>> 指派者
    if (relations.includes("assignee")) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        "task.assignee",
        "assignee"
      );
    }

    return selectQueryBuilder;
  }

  private conditionSelectBuilder(
    builder: SelectQueryBuilder<Substance>,
    conditions: SubstanceQueryInput
  ) {
    Object.keys(conditions).forEach((key) => {
      builder = builder.andWhere(`substance.${key}= :${key}`, {
        [key]: conditions[key],
      });
    });

    return builder;
  }

  async getAllSubstances(
    pagination: Required<PaginationOptions>,
    relations: SubstanceRelation[]
  ): Promise<Substance[]> {
    const { cursor, offset } = pagination;

    const res = await this.generateSelectBuilder(relations)
      .take(offset)
      .skip(cursor)
      .getMany();

    return res;
  }

  async getOneSubstanceById(
    sId: number,
    relations: SubstanceRelation[] = []
  ): Promise<Substance | undefined> {
    const res = await this.generateSelectBuilder(relations)
      .where("substance.substanceId = :sId", { sId })
      .getOne();

    return res;
  }

  async getOneSubstanceByConditions(
    conditions: SubstanceQueryInput,
    relations: SubstanceRelation[] = []
  ): Promise<Substance | undefined> {
    let initialSelectBuilder = this.generateSelectBuilder(relations);

    let conditionSelectBuilder = this.conditionSelectBuilder(
      initialSelectBuilder,
      conditions
    );

    const res = await conditionSelectBuilder.getOne();
    return res;
  }

  async getSubstancesByConditions(
    conditions: SubstanceQueryInput,
    pagination: Required<PaginationOptions>,
    relations: SubstanceRelation[] = []
  ): Promise<Substance[]> {
    const { cursor, offset } = pagination;

    let initialSelectBuilder = this.generateSelectBuilder(relations);

    let conditionSelectBuilder = this.conditionSelectBuilder(
      initialSelectBuilder,
      conditions
    );

    const res = await conditionSelectBuilder
      .take(offset)
      .skip(cursor)
      .getMany();
    return res;
  }

  async createSubstance(
    substance: SubstanceCreateInput | Substance
  ): Promise<Substance> {
    const res = await this.substanceRepository.save(substance);
    return res;
  }

  async updateSubstance(
    indicator: number,
    infoUpdate: SubstanceUpdateInput
  ): Promise<Substance> {
    await this.substanceRepository.update(indicator, infoUpdate);

    const updatedItem = (await this.getOneSubstanceById(indicator))!;

    return updatedItem;
  }

  async deleteSubstance(sId: number): Promise<void> {
    await this.substanceRepository
      .createQueryBuilder()
      .delete()
      .from(Substance)
      .where("substanceId = :sId")
      .setParameter("sId", sId)
      .execute();
  }
}
