import { ObjectType } from "type-graphql";
import { plainToClass } from "class-transformer";

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

import { IAccount, IAccountProfile, AccountVIPLevel } from "../graphql/Account";

import Record from "./Record";

import { ACCOUNT_TYPE } from "../utils/constants";

@ObjectType({ implements: IAccountProfile })
export class AccountProfile extends BaseEntity implements IAccountProfile {
  @Column({ nullable: true, comment: "账号头像" })
  avatar!: string;

  @Column({ nullable: true, comment: "自我介绍" })
  selfIntro!: string;

  @Column({
    nullable: false,
    default: AccountVIPLevel.NON_VIP,
    comment: "账号VIP等级",
  })
  VIPLevel!: AccountVIPLevel;

  @Column({ nullable: false, default: false, comment: "自我介绍" })
  isLifeTimeVIP!: boolean;
}

const ACCOUNT_PROFILE_DEFAULT = plainToClass(AccountProfile, {
  avatar: "",
  selfIntro: "",
  VIPLevel: AccountVIPLevel.NON_VIP,
  isLifeTimeVIP: false,
});

@ObjectType({ implements: IAccount })
@Entity()
export default class Account extends BaseEntity implements IAccount {
  // 账号基本信息
  @PrimaryGeneratedColumn()
  accountId!: number;

  @Column({ unique: true, nullable: false, comment: "账号名称" })
  accountName!: string;

  @Column({ nullable: false, comment: "账号密码" })
  accountPwd!: string;

  @Column({ nullable: false, default: true, comment: "账号是否可用" })
  accountAvaliable!: boolean;

  @Column({
    nullable: false,
    default: JSON.stringify(ACCOUNT_PROFILE_DEFAULT),
    comment: "账号资料",
  })
  accountProfile!: string;

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
