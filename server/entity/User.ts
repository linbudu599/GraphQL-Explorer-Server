import { Arg, Field, Float, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { IUser, JOB } from "../graphql/User";

import Task from "./Task";

// TODO: 更复杂的数据库表结构
// User 有多个 任务
// 任务包括执行时间 报酬 状态(完成) 评分
// User 唯一的 身份标识
// 身份标识包括 启用时间 失效时间 级别
// 组织 有多个User
// 组织包括 任务栏(Task Entity) 成员 管理层
@ObjectType({ implements: IUser })
@Entity()
export default class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  uid!: string;

  @Column({ unique: true, nullable: true })
  name!: string;

  @Column({ default: 0, nullable: true })
  age!: number;

  @Column({ default: JOB.FE })
  job!: JOB;

  @Column({ default: false, nullable: true })
  isFool!: boolean;

  @CreateDateColumn()
  registryDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;

  @OneToMany(() => Task, (task) => task.assignee)
  @Field((type) => [Task]!, { nullable: true })
  tasks?: Task[];

  @Field((type) => Float, { nullable: true })
  spAgeField?: number;
}
