import {
  Field,
  InputType,
  ID,
  registerEnumType,
  InterfaceType,
  ClassType,
  ObjectType,
  Int,
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
import Record from "../entity/Record";

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

export enum TaskPriority {
  LOW,
  MIDDLE,
  HIGH,
  EMERGENCY,
  DOMINATOR,
}

registerEnumType(TaskSource, {
  name: "TaskSource",
  description: "Task Source",
});

registerEnumType(TaskTarget, {
  name: "TaskTarget",
  description: "Task Against",
});

registerEnumType(TaskPriority, {
  name: "TaskPriority",
  description: "Task Priority",
});

@InterfaceType({ description: "Task Interface Type" })
export abstract class ITask {
  @Field((type) => ID, { nullable: false })
  taskId!: number;

  @Field()
  taskTitle!: string;

  @Field({ nullable: false })
  requireCleaner!: boolean;

  @Field({ nullable: false })
  requirePsychologicalIntervention!: boolean;

  @Field(() => Executor, { nullable: true })
  assignee!: IExecutor;

  @Field()
  taskContent!: string;

  @Field()
  allowAbort!: boolean;

  @Field(() => TaskSource, { nullable: false })
  taskSource!: TaskSource;

  @Field(() => DifficultyLevel, { nullable: false })
  taskLevel!: DifficultyLevel;

  @Field()
  taskAccmplished!: Boolean;

  @Field()
  taskAvaliable!: Boolean;

  @Field()
  taskReward!: number;

  @Field()
  taskRate!: number;

  @Field(() => TaskTarget, { nullable: false })
  taskTarget!: TaskTarget;

  @Field(() => Substance, { nullable: true })
  taskSubstance!: Substance;

  @Field(() => Record, { nullable: true })
  relatedRecord!: Record;

  @Field()
  publishDate!: Date;

  @Field()
  lastUpdateDate!: Date;
}

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class TaskInput implements Partial<ITask> {
  @Field({ nullable: true })
  @Length(2, 100)
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
    @Length(5, 20)
    @IsString()
    taskTitle!: string;

    @Field({ nullable: false })
    @IsPositive()
    @IsNumber()
    substanceId!: number;
  }

  return PublishInput;
};

export const UpdateTaskMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class UpdateInput extends BaseClass {
    @Field((type) => Int, { nullable: false })
    @IsPositive()
    @Length(1, 10)
    @IsNumber()
    taskId!: number;

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

@InputType({ description: "Task Relations Input" })
export class TaskRelationsInput {
  @Field({ nullable: true })
  joinAssignee: boolean = false;

  @Field({ nullable: true })
  joinSubstance: boolean = false;

  @Field({ nullable: true })
  joinRecord: boolean = false;
}

interface ITaskRelationOptions {
  joinAssignee?: boolean;
  joinSubstance?: boolean;
  joinRecord?: boolean;
}
export type TaskRelation = "assignee" | "taskSubstance" | "relatedRecord";

export const getTaskRelations = ({
  joinAssignee = false,
  joinSubstance = false,
  joinRecord = false,
}: ITaskRelationOptions): TaskRelation[] => {
  const relations: TaskRelation[] = [];
  joinAssignee ? relations.push("assignee") : void 0;
  joinSubstance ? relations.push("taskSubstance") : void 0;
  joinRecord ? relations.push("relatedRecord") : void 0;
  return relations;
};
