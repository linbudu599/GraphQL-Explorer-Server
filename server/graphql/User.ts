import {
  Field,
  ObjectType,
  Int,
  InputType,
  ArgsType,
  ID,
  registerEnumType,
  InterfaceType,
  Directive,
  UseMiddleware,
} from "type-graphql";
import {
  Length,
  IsBoolean,
  IsString,
  IsNumber,
  IsOptional,
  Max,
  Min,
  IsPositive,
} from "class-validator";

export enum Job {
  FE = "FE",
  BE = "BE",
}

registerEnumType(Job, {
  name: "Job",
  description: "Job Enum Type",
});

@InterfaceType()
export abstract class IUser {
  @Field((type) => ID)
  uid!: number;

  @Field()
  name!: string;

  @Field()
  age!: number;

  @Field()
  job!: string;

  @Field()
  isFool!: boolean;
}

@InputType({ description: " User InputObject/Args" })
export class UserCreateInput implements Partial<IUser> {
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

@ArgsType()
// extends UserCreateInput will result in error GraphQL Schema
export class UserQueryArgs {
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

@InputType({ description: "Args On Updating User" })
export class UserUpdateInput extends UserCreateInput {
  @Field({ nullable: false })
  @IsNumber()
  @IsPositive()
  @Min(0)
  uid!: number;
}
