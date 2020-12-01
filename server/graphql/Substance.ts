import { Field, ID, InterfaceType } from "type-graphql";

import Task from "../entity/Task";

import { DifficultyLevel } from "./Public";
import { ITask } from "./Task";

@InterfaceType()
export abstract class ISubstance {
  @Field((type) => ID, { nullable: false })
  substanceId!: string;

  @Field({ nullable: false })
  substanceName!: string;

  @Field({ nullable: false })
  substanceDesc!: string;

  @Field({ nullable: false })
  substanceIssues!: string;

  @Field(() => DifficultyLevel, { nullable: false })
  substanceLevel!: DifficultyLevel;

  @Field({ nullable: false })
  asylumed!: boolean;

  @Field(() => Task, { nullable: true })
  relatedTask?: ITask;

  @Field({ nullable: false })
  substanceAppearDate!: Date;

  @Field({ nullable: false })
  lastActiveDate!: Date;
}
