import { IsNumber, Max, Min } from 'class-validator';
import Task from '../entity/Task';
import { Field, ObjectType, InputType } from 'type-graphql';
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
