import {
  Field,
  InputType,
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

import { IExecutor } from "./Executor";
import { DifficultyLevel } from "./Public";

import Executor from "../entity/Executor";
import Substance from "../entity/Substance";

export enum TaskSource {
  GOV,
  MERCHANT,
  SCP,
  PERSONAL,
  OTHER,
}

export enum TaskTarget {
  HUMAN,
  AI,
  WITCHER,
  SCP_ITEM,
  ALIEN,
  CTHULHU,
  OTHER,
}

registerEnumType(TaskSource, {
  name: "TaskSource",
  description: "Task Source",
});

registerEnumType(TaskTarget, {
  name: "TaskTarget",
  description: "Task Against",
});

@InterfaceType()
export abstract class ITask {
  @Field((type) => ID, { nullable: false })
  taskId!: string;

  @Field()
  taskTitle!: string;

  @Field(() => Executor, { nullable: true })
  assignee?: IExecutor;

  @Field()
  taskContent!: string;

  @Field(() => TaskSource, { nullable: false })
  taskSource!: TaskSource;

  @Field(() => DifficultyLevel, { nullable: false })
  taskLevel!: DifficultyLevel;

  @Field()
  taskAccmplished!: Boolean;

  @Field()
  taskReward!: number;

  @Field()
  taskRate?: number;

  @Field(() => TaskTarget, { nullable: false })
  taskTarget!: TaskTarget;

  @Field(() => Substance, { nullable: true })
  taskSubstance!: Substance;

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
