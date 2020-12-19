import { IsNumber, IsOptional, Max, Min } from "class-validator";
import {
  Field,
  ObjectType,
  InputType,
  Int,
  InterfaceType,
  createUnionType,
} from "type-graphql";

import Executor from "../entity/Executor";
import Task from "../entity/Task";
import Substance from "../entity/Substance";
import Account from "../entity/Account";
import Record from "../entity/Record";

@InterfaceType({ description: "Basic Status Wrapper" })
export class IBaseStatus {
  @Field({ nullable: false })
  success!: boolean;

  @Field({ nullable: false })
  message!: string;
}

@ObjectType({
  implements: IBaseStatus,
  description: "Record Response Status Indicator",
})
export class RecordStatus extends IBaseStatus {
  // @Field(() => Account, { nullable: true })
  // relatedAccount!: Account;

  // @Field(() => Executor, { nullable: true })
  // relatedExecutor!: Executor;

  // @Field(() => Task, { nullable: true })
  // relatedTask!: Task;

  // @Field(() => Substance, { nullable: true })
  // relatedSubstance!: Substance;
  @Field(() => [Record], { nullable: true })
  data?: Record[];
}

@ObjectType({
  implements: IBaseStatus,
  description: "Primitive Response Status Indicator",
})
export class AccountStatus extends IBaseStatus {
  @Field(() => [Account], { nullable: true })
  data?: Account[];
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

@InputType({ description: "Pagination Options Input" })
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

export const AccountUnionResult = createUnionType({
  name: "AccountUnionResult",
  types: () => [LoginOrRegisterStatus, AccountStatus] as const,
});
