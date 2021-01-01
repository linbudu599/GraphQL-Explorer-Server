import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
} from "class-validator";
import {
  Field,
  ID,
  registerEnumType,
  InterfaceType,
  InputType,
  ObjectType,
  ClassType,
  Int,
} from "type-graphql";

import Record from "../entity/Record";

import { ACCOUNT_TYPE } from "../utils/constants";

registerEnumType(ACCOUNT_TYPE, {
  name: "AccountType",
  description: "Account Type Enum",
});

export enum AccountVIPLevel {
  NON_VIP,
  SILVER,
  GOLD,
  DIAMOND,
  DOMINATOR,
}

registerEnumType(AccountVIPLevel, {
  name: "AccountVIPLevel",
  description: "Account VIP Level Enum",
});

@InterfaceType({ description: "Account Profile Type" })
export abstract class IAccountProfile {
  @Field()
  avatar!: string;

  @Field()
  selfIntro!: string;

  @Field((type) => AccountVIPLevel)
  VIPLevel!: AccountVIPLevel;

  @Field()
  isLifeTimeVIP!: boolean;
}

@InterfaceType({ description: "Account Interface Type" })
export abstract class IAccount {
  @Field((type) => ID)
  accountId!: number;

  @Field()
  accountName!: string;

  @Field()
  accountAvaliable!: boolean;

  @Field()
  accountPwd!: string;

  @Field()
  accountProfile!: string;

  @Field((type) => ACCOUNT_TYPE)
  accountType!: ACCOUNT_TYPE;

  @Field((type) => [Record]!, { nullable: true })
  relatedRecord!: Record[];

  @Field((type) => Date)
  registryDate!: Date;

  @Field((type) => Date)
  lastUpdateDate!: Date;
}

// isAbstract: will not register type in schema emitted
// only InputType need to extend by mixin
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class AccountInput {
  @Field()
  @IsNotEmpty()
  @Length(2, 15)
  @IsString()
  accountName!: string;

  @Field()
  @IsNotEmpty()
  @Length(6, 20)
  @IsString()
  accountPwd!: string;
}

export const RegisterInputMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class RegisterInput extends BaseClass {
    @Field((type) => ACCOUNT_TYPE, { nullable: true })
    @IsNotEmpty()
    @IsEnum(ACCOUNT_TYPE)
    loginType?: ACCOUNT_TYPE;
  }

  return RegisterInput;
};

export const LoginInputMixin = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class RegisterInput extends BaseClass {
    @Field((type) => ACCOUNT_TYPE)
    @IsNotEmpty()
    @IsEnum(ACCOUNT_TYPE)
    loginType!: ACCOUNT_TYPE;
  }

  return RegisterInput;
};

@InputType({ description: "Register Input Type" })
export class AccountRegistryInput extends RegisterInputMixin(AccountInput) {}

@InputType({ description: "Login Input Type" })
export class AccountLoginInput extends LoginInputMixin(AccountInput) {}

@InputType({ description: "Account Password Modify Input Type" })
export class AccountPasswordModifyInput {
  @Field((type) => Int)
  @IsPositive()
  @Length(1, 10)
  @IsNumber()
  accountId!: number;

  @Field()
  @IsNotEmpty()
  @Length(2, 15)
  @IsString()
  accountName!: string;

  @Field()
  @IsNotEmpty()
  @Length(6, 20)
  @IsString()
  prevPassword!: string;

  @Field()
  @IsNotEmpty()
  @Length(6, 20)
  @IsString()
  newPassword!: string;
}

@InputType({ description: "Account Profile Input Type" })
export class AccountProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  selfIntro?: string;

  @IsEnum(AccountVIPLevel)
  @IsOptional()
  @Field((type) => AccountVIPLevel, { nullable: true })
  VIPLevel?: AccountVIPLevel;

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  isLifeTimeVIP?: boolean;
}

@InputType({ description: "Account Relations Input Type" })
export class AccountRelationsInput {
  @Field({ nullable: true })
  joinRecord?: boolean;

  @Field({ nullable: true })
  joinRecordExecutor?: boolean;

  @Field({ nullable: true })
  joinRecordTask?: boolean;

  @Field({ nullable: true })
  joinRecordSubstance?: boolean;
}

interface IAccountRelationOptions {
  joinRecord?: boolean;
}
export type AccountRelation = "relatedRecord";

export const getAccountRelations = ({
  joinRecord = false,
}: IAccountRelationOptions): AccountRelation[] => {
  const relations: AccountRelation[] = [];

  joinRecord ? relations.push("relatedRecord") : void 0;

  return relations;
};
