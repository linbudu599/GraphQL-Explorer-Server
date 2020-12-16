// @ts-nocheck
import { Resolver, Query } from "type-graphql";
import * as TypeORM from "typeorm";
import { Connection } from "typeorm";

import SubstanceEntity from "./entity";
import Substance from "./module";

const establishConnection = async <T extends Connection>(
  connection: T
): Promise<T> => {
  return (
    connection ??
    (await TypeORM.createConnection({
      type: "mysql",
      name: "default",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: "root",
      password: process.env.DB_PWD,
      database: process.env.DB_TABLE,
      logging: "all",
      logger: "advanced-console",
      entities: [SubstanceEntity],
    }))
  );
};

@Resolver((of) => Substance)
export default class SubstanceResolver {
  connection: Connection;

  @Query(() => [Substance])
  async QueryAllSubstances() {
    try {
      this.connection = establishConnection(this.connection);
      return this.connection.manager.find(SubstanceEntity);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
