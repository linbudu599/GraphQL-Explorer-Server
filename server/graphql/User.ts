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

export enum JOB {
  FE = "Frontend Engineer",
  BE = "Backend Engineer",
}

export enum UserLevel {
  ROOKIE,
  NOVICE,
  BEGINNER,
  SKILLED,
  MASTER,
  LEGEND,
  OLD_DOMINATOR,
}

registerEnumType(JOB, {
  name: "Job",
  description: "Job Enum Type",
});

registerEnumType(UserLevel, {
  name: "UserLevel",
  description: "User Skill Level",
});

@InterfaceType()
export abstract class IUser {
  @Field((type) => ID, { nullable: false })
  uid!: string;

  @Field()
  name!: string;

  @Field()
  age!: number;

  @Field((type) => JOB)
  job!: JOB;

  @Field()
  isFool!: boolean;

  @Field((type) => UserLevel, { nullable: false })
  level!: UserLevel;

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
// extends UserCreateInput will result in error GraphQL Schema
export class UserQueryArgs {
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

@InputType({ description: " User InputObject/Args" })
export class UserCreateInput implements Partial<IUser> {
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

@InputType({ description: "Args On User Update" })
export class UserUpdateInput extends UserCreateInput {
  @Field({ nullable: false })
  @IsString()
  uid!: string;
}
