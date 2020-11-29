import { IsNumber, Max, Min } from 'class-validator';
import Task from '../entity/Task';
import { Field, ObjectType, InputType, Int } from 'type-graphql';
import User from '../entity/User';

@ObjectType({ description: 'User Response Status Indicator' })
export class UserStatus {
  @Field({ nullable: false })
  success!: boolean;

  @Field({ nullable: false })
  message!: string;

  @Field(() => [User]!, { nullable: true })
  data?: User[];
}

// TODO: 在TaskStatus上做一些定制逻辑如中间件/扩展
@ObjectType({ description: 'Task Response Status Indicator' })
export class TaskStatus {
  @Field({ nullable: false })
  success!: boolean;

  @Field({ nullable: false })
  message!: string;

  @Field(() => [Task]!, { nullable: true })
  data?: Task[];
}

@ObjectType({ description: 'Login / Register Status Indicator' })
export class LoginOrRegisterStatus {
  @Field({ nullable: false })
  success!: boolean;

  @Field({ nullable: false })
  message!: string;

  @Field({ nullable: true })
  token?: string;

  // 下发token过期时间
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
  @Max(10)
  @Min(0)
  @IsNumber()
  cursor?: number;

  @Field(() => Int, { nullable: true })
  @Max(100)
  @Min(0)
  @IsNumber()
  offset?: number;
}
