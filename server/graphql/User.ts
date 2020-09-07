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
} from "type-graphql";
import {
  Length,
  IsBoolean,
  IsString,
  IsNumber,
  IsOptional,
  Max,
  Min,
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

  @Directive('@deprecated(reason: "Use newField")')
  @Field()
  job!: string;

  @Field()
  isFool!: boolean;
}

@InputType({ description: " User InputObject/Args" })
@ArgsType()
export class UserInputOrArgs implements Partial<IUser> {
  // @Field()
  // @IsNumber()
  // uid?: number;

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
