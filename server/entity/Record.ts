import { ObjectType } from "type-graphql";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";

import { IRecord } from "../graphql/Record";

import Task from "./Task";
import Executor from "./Executor";
import Substance from "./Substance";
import Account from "./Account";

@ObjectType({ implements: IRecord })
@Entity()
export default class Record extends BaseEntity implements IRecord {
  @PrimaryGeneratedColumn()
  recordId!: string;

  @OneToOne(() => Task, (task: Task) => task.relatedRecord)
  recordTask!: Task;

  @OneToOne(() => Account, (account: Account) => account.relatedRecord)
  recordAccount!: Account;

  @OneToOne(() => Substance, (substance: Substance) => substance.relatedRecord)
  recordSubstance!: Substance;

  @OneToOne(() => Executor, (executor: Executor) => executor.relatedRecord)
  recordExecutor!: Executor;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;
}
