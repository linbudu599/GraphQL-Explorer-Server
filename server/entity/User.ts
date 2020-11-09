import { ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IUser, JOB } from "../graphql/User";

// TODO: 更复杂的数据库表结构
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
}
