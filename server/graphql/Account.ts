import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import {
  Field,
  ID,
  registerEnumType,
  InterfaceType,
  InputType,
} from "type-graphql";

export enum ACCOUNT_TYPE {
  VISITOR,
  COMMON,
  ORG,
  ENTERPRISE,
  GOV,
  ADMIN,
  DOMINATOR,
}

registerEnumType(ACCOUNT_TYPE, {
  name: "AccountType",
  description: "Account Type Enum",
});

@InterfaceType()
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

@InputType({ description: "Register Input Type" })
export class AccountRegisterInput {
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

  @Field((type) => ACCOUNT_TYPE, { nullable: true })
  @IsNotEmpty()
  @IsEnum(ACCOUNT_TYPE)
  loginType?: ACCOUNT_TYPE;
}

@InputType({ description: "Login Input Type" })
export class AccountLoginInput {
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

  @Field((type) => ACCOUNT_TYPE, { nullable: false })
  @IsNotEmpty()
  @IsEnum(ACCOUNT_TYPE)
  loginType!: ACCOUNT_TYPE;
}
