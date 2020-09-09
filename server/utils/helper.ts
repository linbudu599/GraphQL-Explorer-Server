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

export class StatusHandler {
  constructor(public success: boolean, public message: string) {}
}

@Service()
export class Logger {
  log(...args: any[]) {
    console.log(chalk.green(...args));
  }
}
