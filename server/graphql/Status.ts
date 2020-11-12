import { Field, ObjectType } from "type-graphql";
import { Service } from "typedi";
import chalk from "chalk";

@ObjectType()
export class Status {
  @Field()
  success!: boolean;

  @Field()
  message: string = "";
}

export default class StatusHandler {
  constructor(public success: boolean, public message: string) {}
}
