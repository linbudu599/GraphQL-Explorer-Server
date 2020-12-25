import { ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  RelationId,
} from "typeorm";

import Task from "./Task";
import Record from "./Record";

import { DifficultyLevel } from "../graphql/Public";
import { ISubstance } from "../graphql/Substance";

@ObjectType({ implements: ISubstance })
@Entity()
export default class Substance extends BaseEntity implements ISubstance {
  // 实体基本信息
  @PrimaryGeneratedColumn()
  substanceId!: string;

  @Column({ unique: true, nullable: false, comment: "实体命名" })
  substanceName!: string;

  @Column({ nullable: false, default: true, comment: "实体是否存活" })
  substanceAlive!: boolean;

  @Column({ nullable: false, default: "实体描述未收集", comment: "实体描述" })
  substanceDesc!: string;

  @Column({ nullable: false, default: "实体事件未收集" })
  substanceIssues!: string;

  @Column({
    nullable: false,
    default: DifficultyLevel.ROOKIE,
    comment: "实体威胁级别",
  })
  substanceLevel!: DifficultyLevel;

  @Column({ nullable: false, default: false, comment: "是否已收收容" })
  asylumed!: boolean;

  // 实体关联任务
  @OneToOne(() => Task, (task) => task.taskSubstance)
  relatedTask!: Task;

  @RelationId((substance: Substance) => substance.relatedTask)
  relatedTaskId?: string;

  // 实体关联记录
  @OneToOne((type) => Record, (record) => record.recordTask)
  relatedRecord!: Record;

  @RelationId((substance: Substance) => substance.relatedRecord)
  relatedRecordId?: string;

  @CreateDateColumn({ comment: "实体首次出现时间" })
  substanceAppearDate!: Date;

  @UpdateDateColumn({ comment: "实体上一次出现时间" })
  lastActiveDate!: Date;
}
