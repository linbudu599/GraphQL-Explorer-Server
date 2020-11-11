import { ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ITask } from "../graphql/Task";

import User from "./User";

@ObjectType({ implements: ITask })
@Entity()
export default class Task extends BaseEntity implements ITask {
  @PrimaryGeneratedColumn()
  taskId!: string;

  @Column({ unique: true })
  taskTitle!: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "assigneeUID" })
  assignee?: User;

  @Column()
  taskContent!: string;

  @Column({ default: false })
  taskStatus!: Boolean;

  @Column()
  taskReward!: number;

  @Column({ nullable: false })
  taskRate?: number;
}
