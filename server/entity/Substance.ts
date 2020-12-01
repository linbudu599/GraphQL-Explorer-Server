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

import Task from "./Task";

import { DifficultyLevel } from "../graphql/Public";
import { ISubstance } from "../graphql/Substance";

@ObjectType({ implements: ISubstance })
@Entity()
export default class Substance extends BaseEntity implements ISubstance {
  @PrimaryGeneratedColumn()
  substanceId!: string;

  @Column({ unique: true, nullable: false })
  substanceName!: string;

  @Column({ nullable: false, default: "实体描述未收集" })
  substanceDesc!: string;

  @Column({ nullable: false, default: "实体事件未收集" })
  substanceIssues!: string;

  @Column({ nullable: false, default: DifficultyLevel.ROOKIE })
  substanceLevel!: DifficultyLevel;

  @Column({ nullable: false, default: false })
  asylumed!: boolean;

  @OneToOne(() => Task, (task) => task.taskSubstance)
  relatedTask!: Task;

  @CreateDateColumn()
  substanceAppearDate!: Date;

  @UpdateDateColumn()
  lastActiveDate!: Date;
}
