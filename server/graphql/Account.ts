import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import {
  Field,
  ID,
  registerEnumType,
  InterfaceType,
  InputType,
  ObjectType,
  ClassType,
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
  @Field({ nullable: true })
  avatar!: string;

  @Field({ nullable: true })
  selfIntro!: string;

  @Field((type) => AccountVIPLevel, { nullable: false })
  VIPLevel!: AccountVIPLevel;

  @Field({ nullable: false })
  isLifeTimeVIP!: boolean;
}

@InterfaceType({ description: "Account Interface Type" })
export abstract class IAccount {
  @Field((type) => ID, { nullable: false })
  accountId!: string;

  @Field({ nullable: false })
  accountName!: string;

  @Field({ nullable: false })
  accountAvaliable!: boolean;

  @Field({ nullable: false })
  accountPwd!: string;

  @Field({ nullable: false })
  accountProfile!: string;

  @Field((type) => ACCOUNT_TYPE, { nullable: false })
  accountType!: ACCOUNT_TYPE;

  @Field(() => Record, { nullable: true })
  relatedRecord!: Record;

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
  @Field({ nullable: false })
  @IsNotEmpty()
  @Length(2, 15)
  @IsString()
  accountName!: string;

  @Field({ nullable: false })
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
    @Field((type) => ACCOUNT_TYPE, { nullable: false })
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

@InputType({ description: "Account Relations Input Type" })
export class AccountRelationsInput {
  @Field({ nullable: true })
  joinRecord: boolean = false;
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
