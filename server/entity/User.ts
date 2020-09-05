import { Field, ObjectType, Int, InputType, ArgsType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import {
  Length,
  IsBoolean,
  IsString,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from "class-validator";

@ObjectType()
@Entity()
export default class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  uid!: number;

  @Field()
  @Column({ unique: true, nullable: true })
  name!: string;

  @Field()
  @Column({ default: 0, nullable: true })
  age!: number;

  @Field()
  @Column({ default: false, nullable: true })
  isFool!: boolean;
}

@InputType()
@ArgsType()
export class UserInputOrArgs {
  @Field()
  @IsNumber()
  uid?: number;

  @Field()
  @Length(1, 20)
  @IsString()
  name?: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(100)
  @Min(18)
  @IsNumber()
  age?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isFool?: boolean;
}
