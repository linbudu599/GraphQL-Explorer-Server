import {
  Field,
  Int,
  InputType,
  ArgsType,
  ID,
  registerEnumType,
  InterfaceType,
  ObjectType,
  ClassType,
} from "type-graphql";
import {
  Length,
  IsBoolean,
  IsString,
  IsNumber,
  IsOptional,
  Max,
  Min,
  IsEnum,
  IsNotEmpty,
} from "class-validator";

import Task from "../entity/Task";

import { DifficultyLevel } from "./Public";

// TODO: expand job enum
export enum JOB {
  FE = "Frontend Engineer",
  BE = "Backend Engineer",
}

export enum REGION {
  CENTRAL,
  ABANDONED,
  SOUTH,
  NORTH,
  PACIFIC_OCEAN,
  OTHER,
}

registerEnumType(REGION, {
  name: "Region",
  description: "Executor Region Enum",
});

registerEnumType(JOB, {
  name: "Job",
  description: "Executor Job Enum",
});

@InterfaceType({ description: "Executor Interface Type" })
export abstract class IExecutorDesc {
  @Field((type) => DifficultyLevel, { nullable: false })
  level!: DifficultyLevel;

  @Field((type) => Int, { nullable: true })
  successRate!: number;

  @Field((type) => Int, { nullable: true })
  satisfaction!: number;
}

@InputType({ description: "Update Executor Desc Input" })
export class ExecutorDescUpdateInput implements Partial<IExecutorDesc> {
  @Field((type) => DifficultyLevel, { nullable: true })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  level?: DifficultyLevel;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(10)
  @Min(0)
  @IsNumber()
  successRate?: number;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(10)
  @Min(0)
  @IsNumber()
  satisfaction?: number;
}

@ArgsType()
export class ExecutorDescQuery implements Partial<IExecutorDesc> {
  @Field((type) => DifficultyLevel, { nullable: true })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  level?: DifficultyLevel;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(10)
  @Min(0)
  @IsNumber()
  successRate?: number;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(10)
  @Min(0)
  @IsNumber()
  satisfaction?: number;
}

@InterfaceType({ description: "Update Executor Basic Info Input" })
export abstract class IExecutor {
  @Field((type) => ID, { nullable: false })
  uid!: string;

  @Field({ nullable: false })
  name!: string;

  @Field({ nullable: false })
  age!: number;

  @Field((type) => JOB, { nullable: false })
  job!: JOB;

  @Field({ nullable: false })
  isFool!: boolean;

  @Field({ nullable: true })
  desc!: string;

  @Field((type) => [Task]!, { nullable: true })
  tasks?: Task[];

  @Field((type) => REGION, { nullable: false })
  region!: REGION;

  @Field((type) => Int, { nullable: true })
  spAgeField?: number;

  @Field((type) => Date)
  joinDate!: Date;

  @Field((type) => Date)
  lastUpdateDate!: Date;
}

@ArgsType()
export class ExecutorQueryArgs {
  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 20)
  @IsString()
  name?: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(100)
  @Min(10)
  @IsNumber()
  age?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isFool?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(JOB)
  job?: JOB;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(REGION)
  region?: REGION;

  @Field((type) => DifficultyLevel, { nullable: false })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  level?: DifficultyLevel;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(10)
  @Min(0)
  @IsNumber()
  successRate?: number;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(10)
  @Min(0)
  @IsNumber()
  satisfaction?: number;
}

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class ExecutorInput {
  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(80)
  @Min(1)
  @IsNumber()
  age?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isFool?: boolean;

  @Field((type) => JOB, { nullable: true })
  @IsOptional()
  @IsEnum(JOB)
  job?: JOB;

  @Field((type) => REGION, { nullable: true })
  @IsOptional()
  @IsEnum(REGION)
  region?: REGION;
}

export const CreateInputMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class CreateInput extends BaseClass {
    @Field({ nullable: false })
    @Length(1, 20)
    @IsNotEmpty()
    @IsString()
    name!: string;
  }

  return CreateInput;
};

export const UpdateInputMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class UpdateInput extends BaseClass {
    @Field({ nullable: false })
    @IsString()
    uid!: string;

    @Field({ nullable: true })
    @Length(1, 20)
    @IsNotEmpty()
    @IsString()
    name?: string;
  }

  return UpdateInput;
};

@InputType({
  description: "Executor Create Input",
})
export class ExecutorCreateInput extends CreateInputMixin(ExecutorInput) {}

@InputType({ description: "Executor Update Input" })
export class ExecutorUpdateInput extends UpdateInputMixin(ExecutorInput) {}
