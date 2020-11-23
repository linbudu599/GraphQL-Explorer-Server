import { ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  RelationId,
} from "typeorm";
import { TypeormLoader } from "type-graphql-dataloader";
import { ITask } from "../graphql/Task";

import User from "./User";

@ObjectType({ implements: ITask })
@Entity()
export default class Task extends BaseEntity implements ITask {
  @PrimaryGeneratedColumn()
  taskId!: string;

  @Column({ unique: true, nullable: false })
  taskTitle!: string;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: true })
  @JoinColumn({ name: "assigneeUID" })
  @TypeormLoader((type) => User, (task: Task) => task.assigneeUID)
  assignee?: User;

  @RelationId((task: Task) => task.assignee)
  assigneeUID?: number;

  @Column({ nullable: false, default: "" })
  taskContent!: string;

  @Column({ nullable: false, default: false })
  taskStatus!: Boolean;

  @Column({ nullable: false, default: 0 })
  taskReward!: number;

  @Column({ nullable: false, default: 0 })
  taskRate?: number;
}
