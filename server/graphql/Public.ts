import { registerEnumType, createUnionType } from "type-graphql";

import User from "../entity/Executor";
import Task from "../entity/Task";

export enum DifficultyLevel {
  ROOKIE,
  NOVICE,
  BEGINNER,
  SKILLED,
  MASTER,
  LEGEND,
  OLD_DOMINATOR,
}

registerEnumType(DifficultyLevel, {
  name: "DifficultyLevel",
  description: "User / Task Difficulty Level",
});

export const LevelQueryResult = createUnionType({
  name: "LevelQueryResult",
  types: () => [User, Task] as const,
});
