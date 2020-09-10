import { ObjectType, Directive } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IUser, Job } from "../graphql/User";

@Directive('@deprecated(reason: "Use newField")')
@ObjectType({ implements: IUser })
@Entity()
export default class User implements IUser {
  @PrimaryGeneratedColumn()
  uid!: number;

  @Column({ unique: true, nullable: true })
  name!: string;

  @Column({ default: 0, nullable: true })
  age!: number;

  @Column({ default: Job.FE })
  job!: string;

  @Column({ default: false, nullable: true })
  isFool!: boolean;
}
