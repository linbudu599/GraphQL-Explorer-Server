import { Field, ID, InputType, InterfaceType } from "type-graphql";

import Task from "../entity/Task";
import Executor from "../entity/Executor";
import Account from "../entity/Account";
import Substance from "../entity/Substance";

@InterfaceType({ description: "Record Interface Type" })
export abstract class IRecord {
  @Field((type) => ID, { nullable: false })
  recordId!: number;

  @Field(() => Task, { nullable: true })
  recordTask!: Task;

  @Field(() => Account, { nullable: true })
  recordAccount!: Account;

  @Field(() => Executor, { nullable: true })
  recordExecutor!: Executor;

  @Field(() => Substance, { nullable: true })
  recordSubstance!: Substance;

  @Field()
  createDate!: Date;

  @Field()
  lastUpdateDate!: Date;
}

@InputType({ description: "Record Relations Input" })
export class RecordRelationsInput {
  @Field({ nullable: true })
  joinTask: boolean = false;

  @Field({ nullable: true })
  joinAccount: boolean = false;

  @Field({ nullable: true })
  joinExecutor: boolean = false;

  @Field({ nullable: true })
  joinSubstance: boolean = false;
}

interface IRecordRelationOptions {
  joinTask?: boolean;
  joinAccount?: boolean;
  joinExecutor?: boolean;
  joinSubstance?: boolean;
}
export type RecordRelations =
  | "recordTask"
  | "recordAccount"
  | "recordExecutor"
  | "recordSubstance";

export const getRecordRelations = ({
  joinTask = false,
  joinAccount = false,
  joinExecutor = false,
  joinSubstance = false,
}: IRecordRelationOptions): RecordRelations[] => {
  const relations: RecordRelations[] = [];

  joinTask ? relations.push("recordTask") : void 0;
  joinAccount ? relations.push("recordAccount") : void 0;
  joinExecutor ? relations.push("recordExecutor") : void 0;
  joinSubstance ? relations.push("recordSubstance") : void 0;

  return relations;
};
