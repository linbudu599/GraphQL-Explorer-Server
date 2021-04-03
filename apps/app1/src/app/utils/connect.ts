import * as TypeORM from 'typeorm';
import AccountEntity from '../entities/Account';
import ExecutorEntity from '../entities/Executor';
// import RecipeEntity from "../entities/Recipe";
import RecordEntity from '../entities/Record';
import SubstanceEntity from '../entities/Substance';
import TaskEntity from '../entities/Task';

import { log } from './helper';

const IS_DEV =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

export const dbConnect = async (): Promise<any> => {
  log('[TypeORM] TypeORM Connecting');
  log(`[TypeORM] Config Env:  ${IS_DEV ? '-DEV-' : '-PROD-'}`);

  const connection = await TypeORM.createConnection({
    type: 'sqlite',
    name: 'default',
    database: IS_DEV ? 'db.sqlite' : 'db-prod.sqlite',
    // synchronize: IS_DEV,
    synchronize: true,
    dropSchema: IS_DEV,
    // logging: IS_DEV ? false : "all",
    maxQueryExecutionTime: 1000,
    logger: 'advanced-console',
    entities: [
      AccountEntity,
      ExecutorEntity,
      RecordEntity,
      SubstanceEntity,
      TaskEntity,
    ],
    // factories: ['apps/app1/src/app/entities/factories/*.ts'],
    // seeds: ['apps/app1/src/app/entities/seeds/*.ts'],
    cache: {
      duration: 1000,
    },
    // subscribers: [
    //   IS_DEV
    //     ? 'apps/app1/src/app/entities/subscribers/*.ts'
    //     : 'dist/entities/subscribers/*.js',
    // ],
  });

  log(`[TypeORM] Connection >>>[${connection.name}]<<< Established`);

  return connection;
};
