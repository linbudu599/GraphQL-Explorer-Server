import { IsNumber, Max, Min } from "class-validator";
import { Field, ObjectType, InputType } from "type-graphql";
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

export class StatusHandler {
  constructor(
    public success: boolean,
    public message: string,
    public data: any = []
  ) {}
}

@InputType()
export class PaginationOptions {
  @Field({ nullable: true })
  @Max(10)
  @Min(0)
  @IsNumber()
  cursor?: number;

  @Field({ nullable: true })
  @Max(100)
  @Min(0)
  @IsNumber()
  offset?: number;
}
