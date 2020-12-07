import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import {
  Field,
  ID,
  registerEnumType,
  InterfaceType,
  InputType,
  ObjectType,
  ClassType,
} from "type-graphql";

import { ACCOUNT_TYPE } from "../utils/constants";

registerEnumType(ACCOUNT_TYPE, {
  name: "AccountType",
  description: "Account Type Enum",
});

@InterfaceType({ description: "Account Interface Type" })
export abstract class IAccount {
  @Field((type) => ID, { nullable: false })
  accountId!: string;

  @Field({ nullable: false })
  accountName!: string;

  @Field({ nullable: false })
  accountPwd!: string;

  @Field((type) => ACCOUNT_TYPE, { nullable: false })
  accountType!: ACCOUNT_TYPE;

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
