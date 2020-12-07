import {
  Field,
  InputType,
  ID,
  registerEnumType,
  InterfaceType,
  ClassType,
  ObjectType,
} from "type-graphql";
import {
  Length,
  IsString,
  IsNumber,
  IsOptional,
  Max,
  Min,
  IsPositive,
  IsEnum,
} from "class-validator";

import Executor from "../entity/Executor";
import Substance from "../entity/Substance";

import { IExecutor } from "./Executor";
import { DifficultyLevel } from "./Public";

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

@InterfaceType({ description: "Task Interface Type" })
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

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class TaskInput implements Partial<ITask> {
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
  @IsOptional()
  @IsEnum(TaskSource)
  taskSource?: TaskSource;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  taskLevel?: DifficultyLevel;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(TaskTarget)
  taskTarget?: TaskTarget;
}

export const PublishTaskMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class PublishInput extends BaseClass {
    @Field({ nullable: false })
    @Length(5, 10)
    @IsString()
    taskTitle!: string;
  }

  return PublishInput;
};

export const UpdateTaskMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class UpdateInput extends BaseClass {
    @Field({ nullable: false })
    @IsString()
    taskId!: string;

    @Field({ nullable: true })
    @Length(5, 10)
    @IsString()
    taskTitle?: string;

    @Field({ nullable: true })
    @Max(10)
    @Min(0)
    @IsNumber()
    @IsPositive()
    @IsOptional()
    taskRate?: number;
  }

  return UpdateInput;
};

@InputType({ description: "Task Create Input" })
export class TaskCreateInput extends PublishTaskMixin(TaskInput) {}

@InputType({ description: "Task Update Input" })
export class TaskUpdateInput extends UpdateTaskMixin(TaskInput) {}
