import {
  Field,
  Int,
  InputType,
  ArgsType,
  ID,
  registerEnumType,
  InterfaceType,
  ObjectType,
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
  IsPositive,
} from "class-validator";

import Task from "../entity/Task";

import { DifficultyLevel } from "./Public";

// TODO: expand job enum
export enum JOB {
  FE = "Frontend Engineer",
  BE = "Backend Engineer",
}

registerEnumType(JOB, {
  name: "Job",
  description: "Job Enum Type",
});

@InterfaceType()
export class IExecutorDesc {
  @Field((type) => DifficultyLevel, { nullable: false })
  level!: DifficultyLevel;

  @Field((type) => Int, { nullable: true })
  successRate!: number;

  @Field((type) => Int, { nullable: true })
  satisfaction!: number;
}

@InterfaceType()
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

  @Field((type) => Int, { nullable: true })
  spAgeField?: number;

  @Field((type) => Date)
  registryDate!: Date;

  @Field((type) => Date)
  lastUpdateDate!: Date;
}

@ArgsType()
// extends ExecutorCreateInput will result in error GraphQL Schema
export class ExecutorQueryArgs {
  @Field({ nullable: true })
  @IsOptional()
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

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(JOB)
  job?: JOB;
}

@InputType({ description: " Executor InputObject/Args" })
export class ExecutorCreateInput implements Partial<IExecutor> {
  @Field({ nullable: false })
  @Length(1, 20)
  @IsString()
  name!: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Max(80)
  @Min(0)
  @IsPositive()
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
}

@InputType({ description: "Args On Executor Update" })
export class ExecutorUpdateInput extends ExecutorCreateInput {
  @Field({ nullable: false })
  @IsString()
  uid!: string;
}
