import { Field, ID, InterfaceType } from "type-graphql";

import Task from "../entity/Task";
import Executor from "../entity/Executor";
import Account from "../entity/Account";

@InterfaceType({ description: "Record Interface Type" })
export abstract class IRecord {
  @Field((type) => ID, { nullable: false })
  recordId!: string;

  @Field(() => Task, { nullable: true })
  recordTask!: Task;

  @Field(() => Account, { nullable: true })
  recordAccount!: Account;

  @Field(() => Executor, { nullable: true })
  recordExecutor!: Executor;

  @Field()
  createDate!: Date;

  @Field()
  lastUpdateDate!: Date;
}
