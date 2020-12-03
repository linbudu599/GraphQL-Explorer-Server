import { ObjectType } from "type-graphql";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { ACCOUNT_TYPE, IAccount } from "../graphql/Account";

@ObjectType({ implements: IAccount })
@Entity()
export default class Account extends BaseEntity implements IAccount {
  @PrimaryGeneratedColumn()
  accountId!: string;

  @Column({ unique: true, nullable: false })
  accountName!: string;

  @Column({ nullable: false })
  accountPwd!: string;

  @Column({ nullable: false, default: ACCOUNT_TYPE.VISITOR })
  accountType!: ACCOUNT_TYPE;

  // TODO: Many2One Relation
  //   @Column({ nullable: true })
  //   guarantor?: Account;

  @CreateDateColumn()
  registryDate!: Date;

  @UpdateDateColumn()
  lastUpdateDate!: Date;
}
