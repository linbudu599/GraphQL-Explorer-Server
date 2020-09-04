import { Field, ObjectType, Int, InputType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export default class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  uid!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column()
  age!: number;

  @Field()
  @Column()
  isFool!: boolean;
}
