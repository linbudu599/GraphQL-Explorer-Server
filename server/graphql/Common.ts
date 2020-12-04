import { IsNumber, IsOptional, Max, Min } from "class-validator";
import { Field, ObjectType, InputType, Int, InterfaceType } from "type-graphql";

import Executor from "../entity/Executor";
import Task from "../entity/Task";
import Substance from "../entity/Substance";

@InterfaceType({ description: "Basic Status Wrapper" })
export class IBaseStatus {
  @Field({ nullable: false })
  success!: boolean;

  @Field({ nullable: false })
  message!: string;
}

@ObjectType({
  implements: IBaseStatus,
  description: "Primitive Response Status Indicator",
})
export class PrimitiveStatus extends IBaseStatus {
  @Field(() => String, { nullable: true })
  data?: any;
}

@ObjectType({
  implements: IBaseStatus,
  description: "Substance Response Status Indicator",
})
export class SubstanceStatus extends IBaseStatus {
  @Field(() => [Substance]!, { nullable: true })
  data?: Substance[];
}

@ObjectType({
  implements: IBaseStatus,
  description: "Executor Response Status Indicator",
})
export class ExecutorStatus extends IBaseStatus {
  @Field(() => [Executor]!, { nullable: true })
  data?: Executor[];
}

@ObjectType({
  implements: IBaseStatus,
  description: "Task Response Status Indicator",
})
export class TaskStatus extends IBaseStatus {
  @Field(() => [Task]!, { nullable: true })
  data?: Task[];
}

@ObjectType({
  implements: IBaseStatus,
  description: "Login / Register Status Indicator",
})
export class LoginOrRegisterStatus extends IBaseStatus {
  @Field({ nullable: true })
  token?: string;

  // 下发token过期时间?
  @Field(() => Int, { nullable: true })
  expiredDate?: number;
}

export class LoginOrRegisterStatusHandler {
  constructor(
    public success: boolean,
    public message: string,
    public token?: string,
    public expiredDate?: number
  ) {}
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
  @Field(() => Int, { nullable: true })
  @Max(100)
  @Min(0)
  @IsOptional()
  @IsNumber()
  cursor?: number;

  @Field(() => Int, { nullable: true })
  @Max(200)
  @Min(0)
  @IsOptional()
  @IsNumber()
  offset?: number;
}
