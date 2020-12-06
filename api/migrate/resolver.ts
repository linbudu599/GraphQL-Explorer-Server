// @ts-nocheck
import { Resolver, Query } from "type-graphql";
import { Repository, getConnection } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import SubstanceEntity from "./entity";
import Substance from "./module";

@Resolver((of) => Substance)
export default class SubstanceResolver {
  // constructor(
  //   @InjectRepository(SubstanceEntity)
  //   private readonly substanceRepository: Repository<SubstanceEntity>
  // ) {}

  @Query(() => [Substance])
  async QueryAllSubstances() {
    try {
      // const res = await this.substanceRepository.find();
      // return res;
      const connection = await getConnection();
      const res = await connection.manager.find(SubstanceEntity);
      return res;
    } catch (error) {
      // return [];
      console.error(error);
    }
  }
}
