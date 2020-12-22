import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Substance from "../entity/Substance";

import { PaginationOptions } from "../graphql/Common";
import { SubstanceRelation } from "../graphql/Substance";

export interface ISubstanceService {
  getAllSubstances(
    pagination: Required<PaginationOptions>,
    relations: SubstanceRelation[]
  ): Promise<Substance[]>;

  getOneSubstanceById(
    substanceId: string,
    relations: SubstanceRelation[]
  ): Promise<Substance | undefined>;
}

@Service()
export default class SubstanceService implements ISubstanceService {
  constructor(
    @InjectRepository(Substance)
    private readonly substanceRepository: Repository<Substance>
  ) {}

  async getAllSubstances(
    pagination: Required<PaginationOptions>,
    relations: SubstanceRelation[]
  ): Promise<Substance[]> {
    const { cursor, offset } = pagination;

    const res = await this.substanceRepository.find({
      skip: cursor,
      take: offset,
      relations,
    });

    return res;
  }

  async getOneSubstanceById(
    sId: string,
    relations: SubstanceRelation[] = []
  ): Promise<Substance | undefined> {
    const res = await this.substanceRepository.findOne(sId, {
      relations,
    });

    return res;
  }
}
