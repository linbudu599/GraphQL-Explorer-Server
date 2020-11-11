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
} from "class-validator";

import { IUser } from "./User";

@InterfaceType()
export abstract class ITask {
  @Field((type) => ID)
  taskId!: string;

  @Field()
  taskTitle!: string;

  @Field()
  assignee?: IUser;

  @Field()
  taskContent!: string;

  @Field()
  taskStatus!: Boolean;

  @Field()
  taskReward!: number;

  @Field()
  taskRate?: number;
}
