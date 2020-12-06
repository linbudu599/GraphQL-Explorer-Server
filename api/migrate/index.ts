import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import * as TypeORM from "typeorm";
import { plainToClass } from "class-transformer";
import { ApolloServer as ApolloVercelServer } from "@saeris/apollo-server-vercel";

import SubstanceResolver from "./resolver";
import SubstanceEntity from "./entity";

const schema = buildSchemaSync({
  resolvers: [SubstanceResolver],
});

console.log(process.env.NODE_ENV);

const dev = process.env.NODE_ENV === "development";

const createSubstance = (
  substance: Partial<SubstanceEntity>
): SubstanceEntity => plainToClass(SubstanceEntity, substance);

export const mockSubstance = (len: number) => {
  const mockSubstanceInfo: Partial<SubstanceEntity>[] = [];

  for (let i = 0; i < len; i++) {
    mockSubstanceInfo.push(
      createSubstance({
        substanceName: `Substance-${i}`,
        substanceAlive: i % 2 === 0,
      })
    );
  }

  return mockSubstanceInfo;
};

const connect2SQLite = async () => {
  console.log("[TypeORM] TypeORM Connecting");
  try {
    const connection = await TypeORM.createConnection({
      type: "sqlite",
      name: "default",
      database: "./vercel.db",
      synchronize: true,
      dropSchema: true,
      logging: "all",
      maxQueryExecutionTime: 1000,
      logger: "advanced-console",
      entities: [dev ? "./api/migrate/entity/*.ts" : "./entity/*.js"],
    });
    console.log("[TypeORM] Database Connection Established");

    const mockSubstanceInfo = mockSubstance(5);
    await connection.manager.save(mockSubstanceInfo);

    console.log("[TypeORM] Initial Mock Data Inserted\n");
  } catch (error) {
    console.log(error, "red");
  }
};
connect2SQLite();

const server = new ApolloVercelServer({
  schema,
  playground: true,
  introspection: true,
});

export default server.createHandler();
