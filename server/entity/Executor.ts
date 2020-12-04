import { Extensions, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { plainToClass } from "class-transformer";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  RelationId,
} from "typeorm";

import { IExecutor, JOB, IExecutorDesc, REGION } from "../graphql/Executor";
import { DifficultyLevel } from "../graphql/Public";

import Task from "./Task";

import { LogExtension } from "../extensions/LogExtension";

@ObjectType({ implements: IExecutorDesc })
export class ExecutorDesc extends BaseEntity implements IExecutorDesc {
  @Column({ default: DifficultyLevel.ROOKIE, nullable: true })
  level!: DifficultyLevel;

  @Column({ default: 0, nullable: true })
  successRate!: number;

  @Column({ default: 0, nullable: true })
  satisfaction!: number;
}

const Executor_DESC_DEFAULT = plainToClass(ExecutorDesc, {
  level: DifficultyLevel.ROOKIE,
  successRate: 0,
  satisfaction: 0,
});

@ObjectType({ implements: IExecutor })
@Entity()
export default class Executor extends BaseEntity implements IExecutor {
  @PrimaryGeneratedColumn()
  uid!: string;

  @Column({ unique: true, nullable: false })
  name!: string;

  @Column({ default: 0, nullable: false })
  age!: number;

  @Column({ default: JOB.FE })
  job!: JOB;

  @Column({ default: false, nullable: false })
  isFool!: boolean;

  @OneToMany(() => Task, (task) => task.assignee)
  @TypeormLoader((type) => Executor, (Executor: Executor) => Executor.taskIds)
  tasks?: Task[];

  @Column({ default: JSON.stringify(Executor_DESC_DEFAULT) })
  desc!: string;

  @RelationId((Executor: Executor) => Executor.tasks)
  taskIds?: string[];

  @Column({ default: REGION.OTHER, nullable: false })
  region!: REGION;

  @Extensions({ info: "Executor.name Field" })
  @Extensions({ complexity: 1 })
  @LogExtension({ message: "我直接好家伙" })
  spAgeField?: number;

  @CreateDateColumn()
  joinDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;
}
