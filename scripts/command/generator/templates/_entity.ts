// @ts-nocheck
import { ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { I__ENTITY_NAME__ } from "../graphql/__ENTITY_NAME__";

@ObjectType({ implements: I__ENTITY_NAME__ })
@Entity()
export default class __ENTITY_NAME__
  extends BaseEntity
  implements I__ENTITY_NAME__ {
  @PrimaryGeneratedColumn()
  __LOWERCASE_ENTITY_NAME__Id!: number;

  @Column()
  prop!: string;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
