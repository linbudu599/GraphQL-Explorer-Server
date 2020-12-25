import { ObjectType } from "type-graphql";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  RelationId,
} from "typeorm";

import { IAccount } from "../graphql/Account";

import Record from "./Record";

import { ACCOUNT_TYPE } from "../utils/constants";

/**
 * 账号发布任务历史记录
 */

@ObjectType({ implements: IAccount })
@Entity()
export default class Account extends BaseEntity implements IAccount {
  // 账号基本信息
  @PrimaryGeneratedColumn()
  accountId!: string;

  @Column({ unique: true, nullable: false, comment: "账号名称" })
  accountName!: string;

  @Column({ nullable: false, comment: "账号密码" })
  accountPwd!: string;

  @Column({ nullable: false, default: true, comment: "账号是否可用" })
  accountAvaliable!: boolean;

  @Column({
    nullable: false,
    default: ACCOUNT_TYPE.VISITOR,
    comment: "账号类型",
  })
  accountType!: ACCOUNT_TYPE;

  // 账号关联记录
  @OneToOne((type) => Record, (record) => record.recordAccount)
  relatedRecord!: Record;

  @RelationId((account: Account) => account.relatedRecord)
  relatedRecordId?: string;

  @CreateDateColumn({ comment: "注册时间" })
  registryDate!: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  lastUpdateDate!: Date;
}
