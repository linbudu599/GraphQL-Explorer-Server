import { registerEnumType, createUnionType } from "type-graphql";

import Executor from "../entity/Executor";
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
  description: "Executor Skill / Task Difficulty Level",
});

export const LevelQueryResult = createUnionType({
  name: "LevelQueryResult",
  types: () => [Executor, Task] as const,
});
