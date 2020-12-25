import { ObjectType } from "type-graphql";

import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => Task, (task: Task) => task.relatedRecord, {
    nullable: true,
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  recordTask!: Task;

  @OneToOne(() => Account, (account: Account) => account.relatedRecord, {
    nullable: true,
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  recordAccount!: Account;

  @OneToOne(
    () => Substance,
    (substance: Substance) => substance.relatedRecord,
    {
      nullable: true,
      cascade: true,
      onDelete: "SET NULL",
    }
  )
  @JoinColumn()
  recordSubstance!: Substance;

  @OneToOne(() => Executor, (executor: Executor) => executor.relatedRecord, {
    nullable: true,
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  recordExecutor!: Executor;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;
}
