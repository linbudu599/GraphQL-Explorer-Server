import { Field, ObjectType } from "type-graphql";
import User from "../entity/User";

@ObjectType({ description: "Response Status Indicator" })
export class Status {
  @Field({ nullable: false })
  success!: boolean;

  @Field({ nullable: false })
  message!: string;

  @Field(() => [User]!, { nullable: true })
  data?: User[];
}

export default class StatusHandler {
  constructor(
    public success: boolean,
    public message: string,
    public data: any = []
  ) {}
}
