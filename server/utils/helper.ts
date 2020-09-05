import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Status {
  @Field()
  success!: boolean;

  @Field()
  message: string = "";
}

export class StatusHandler {
  constructor(public success: boolean, public message: string) {}
}
