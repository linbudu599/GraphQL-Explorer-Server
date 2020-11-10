import { ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { ITask } from "../graphql/User";

import User from "./User";

@ObjectType({ implements: ITask })
@Entity()
export default class Task extends BaseEntity implements ITask {
  @PrimaryGeneratedColumn()
  taskId!: string;

  @Column({ unique: true })
  taskTitle!: string;

  // @Column({ default: "UN_ASSIGNED" })
  @ManyToOne(() => User, (user) => user.tasks)
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
