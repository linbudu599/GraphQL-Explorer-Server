import {
  Field,
  Int,
  InputType,
  ArgsType,
  ID,
  registerEnumType,
  InterfaceType,
} from "type-graphql";
import {
  Length,
  IsString,
  IsNumber,
  IsOptional,
  Max,
  Min,
  IsPositive,
} from "class-validator";

import { IUser } from "./User";
import User from "../entity/User";

export enum TaskSource {
  GOV,
  MERCHANT,
  SCP,
  PERSONAL,
  OTHER,
}

registerEnumType(TaskSource, {
  name: "TaskSource",
  description: "Task Source",
});

@InterfaceType()
export abstract class ITask {
  @Field((type) => ID, { nullable: false })
  taskId!: string;

  @Field()
  taskTitle!: string;

  @Field(() => User, { nullable: true })
  assignee?: IUser;

  @Field()
  taskContent!: string;

  @Field(() => TaskSource, { nullable: false })
  taskSource!: TaskSource;

  @Field()
  taskAccmplished!: Boolean;

  @Field()
  taskReward!: number;

  @Field()
  taskRate?: number;

  @Field()
  publishDate!: Date;

  @Field()
  lastUpdateDate!: Date;
}

@InputType({ description: "Task InputObject" })
export class TaskCreateInput implements Partial<ITask> {
  @Field()
  @Length(5, 10)
  @IsString()
  taskTitle!: string;

  @Field({ nullable: true })
  @Length(2, 20)
  @IsString()
  @IsOptional()
  taskContent?: string;

  @Field({ nullable: true })
  @Max(1000)
  @Min(0)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  taskReward?: number;
}

@InputType({ description: "Args On Task Update" })
export class TaskUpdateInput {
  @Field()
  @IsString()
  taskId!: string;

  @Field({ nullable: true })
  @Length(5, 10)
  @IsString()
  taskTitle?: string;

  @Field({ nullable: true })
  @Length(2, 20)
  @IsString()
  @IsOptional()
  taskContent?: string;

  @Field({ nullable: true })
  @Max(1000)
  @Min(0)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  taskReward?: number;

  @Field({ nullable: true })
  @Max(10)
  @Min(0)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  taskRate?: number;
}
