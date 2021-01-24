import * as TypeORM from "typeorm";

import { log } from "./helper";

export const dbConnect = async (): Promise<any> => {
  log("[TypeORM] TypeORM Connecting");

  const connection = await TypeORM.createConnection();

  log(`[TypeORM] Connection >>>[${connection.name}]<<< Established`);

  return connection;
};
