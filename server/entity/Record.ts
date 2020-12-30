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
  recordId!: number;

  @OneToOne((type) => Task, (task: Task) => task.relatedRecord, {
    nullable: true,
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "recordTaskId" })
  recordTask!: Task;

  @OneToOne((type) => Account, (account: Account) => account.relatedRecord, {
    nullable: true,
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "recordAccountId" })
  recordAccount!: Account;

  @OneToOne(
    (type) => Substance,
    (substance: Substance) => substance.relatedRecord,
    {
      nullable: true,
      cascade: true,
      onDelete: "SET NULL",
    }
  )
  @JoinColumn({ name: "recordSubstanceId" })
  recordSubstance!: Substance;

  @OneToOne(
    (type) => Executor,
    (executor: Executor) => executor.relatedRecord,
    {
      nullable: true,
      cascade: true,
      onDelete: "SET NULL",
    }
  )
  @JoinColumn({ name: "recordExecutorId" })
  recordExecutor!: Executor;

  @CreateDateColumn({ comment: "记录创建时间" })
  createDate!: Date;

  @UpdateDateColumn({ comment: "记录更新时间" })
  lastUpdateDate!: Date;
}
