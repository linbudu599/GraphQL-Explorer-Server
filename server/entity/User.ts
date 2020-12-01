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

import { LogExtension } from "../extensions/LogExtension";

import Task from "./Task";

import { IUser, JOB, IUserDesc } from "../graphql/User";
import { DifficultyLevel } from "../graphql/Public";

@ObjectType({ implements: IUserDesc })
export class UserDesc extends BaseEntity implements IUserDesc {
  @Column({ default: DifficultyLevel.ROOKIE, nullable: true })
  level!: DifficultyLevel;

  @Column({ default: 0, nullable: true })
  successRate!: number;

  @Column({ default: 0, nullable: true })
  satisfaction!: number;
}

const USER_DESC_DEFAULT = plainToClass(UserDesc, {
  level: DifficultyLevel.OLD_DOMINATOR,
  successRate: 0,
  satisfaction: 0,
});

@ObjectType({ implements: IUser })
@Entity()
export default class User extends BaseEntity implements IUser {
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

  @CreateDateColumn()
  registryDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;

  @OneToMany(() => Task, (task) => task.assignee)
  @TypeormLoader((type) => User, (user: User) => user.taskIds)
  tasks?: Task[];

  @Column({ default: JSON.stringify(USER_DESC_DEFAULT) })
  desc!: string;

  @RelationId((user: User) => user.tasks)
  taskIds?: number[];

  @Extensions({ info: "User.name Field" })
  @Extensions({ complexity: 1 })
  @LogExtension({ message: "我直接好家伙" })
  spAgeField?: number;
}
