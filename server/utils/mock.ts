import * as TypeORM from "typeorm";
import Container from "typedi";
import { plainToClass } from "class-transformer";

import {
  Difficulty,
  CompanyScale,
  Cook,
  Recipe,
  Company,
  SaltFish,
  WorkExperience,
} from "../graphql/Recipe";
import { DifficultyLevel } from "../graphql/Public";

import Executor, { ExecutorDesc } from "../entity/Executor";
import Task from "../entity/Task";
import Substance from "../entity/Substance";

import { log } from "./helper";

const createWorkExperience = (
  workExp: Partial<WorkExperience>
): WorkExperience => plainToClass(WorkExperience, workExp);

const createSaltFish = (fish: Partial<SaltFish>): SaltFish =>
  plainToClass(SaltFish, fish);

const createCompany = (company: Partial<Company>): Company =>
  plainToClass(Company, company);

const createCook = (cookData: Partial<Cook>): Cook =>
  plainToClass(Cook, cookData);

const createRecipe = (recipeData: Partial<Recipe>): Recipe =>
  plainToClass(Recipe, recipeData);

export const sampleSaltFishes = [
  createSaltFish({
    EngelCoefficient: 90,
  }),
  createSaltFish({
    EngelCoefficient: 80,
  }),
];

export const sampleCompanies = [
  createCompany({
    name: "XX有限公司",
    scale: CompanyScale.Small,
    registerDate: new Date(),
    description: "小公司罢了",
  }),
  createCompany({
    name: "不渡科技有限公司",
    scale: CompanyScale.Huge,
    registerDate: new Date(),
    description: "我直接世界500强",
  }),
];

export const sampleWorkExperience = [
  createWorkExperience({
    company: sampleCompanies[0],
    isFired: true,
    workYears: 1,
  }),
  createWorkExperience({
    company: sampleCompanies[1],
    isFired: false,
    workYears: 10,
  }),
];

export const sampleCooks = [
  createCook({
    name: "Gordon Ramsay",
    yearsOfExperience: 21,
    experience: sampleWorkExperience[0],
  }),
  createCook({
    name: "Kim Kardashian",
    yearsOfExperience: 1,
    experience: sampleWorkExperience[1],
  }),
];

export const sampleRecipes = [
  createRecipe({
    title: "Recipe 1",
    description: "Desc 1",
    preparationDifficulty: Difficulty.Easy,
    ingredients: ["one", "two", "three"],
    cook: sampleCooks[1],
  }),
  createRecipe({
    title: "Recipe 2",
    description: "Desc 2",
    preparationDifficulty: Difficulty.Easy,
    ingredients: ["four", "five", "six"],
    cook: sampleCooks[0],
  }),
  createRecipe({
    title: "Recipe 3",
    description: "Desc 3",
    preparationDifficulty: Difficulty.Beginner,
    ingredients: ["seven", "eight", "nine"],
    cook: sampleCooks[1],
  }),
  createRecipe({
    title: "Recipe 4",
    description: "Desc 4",
    preparationDifficulty: Difficulty.MasterChef,
    ingredients: ["ten", "eleven", "twelve"],
    cook: sampleCooks[0],
  }),
  createRecipe({
    title: "Recipe 5",
    description: "Desc 5",
    preparationDifficulty: Difficulty.Hard,
    ingredients: ["thirteen", "fourteen", "fifteen"],
    cook: sampleCooks[0],
  }),
];

export const setRecipeInContainer = (): void => {
  log("[TypeDI] Recipe Set to Container");
  Container.set({
    id: "RECIPES_DATA",
    // create a copy for each request
    transient: true,
    factory: () => sampleRecipes.slice(),
  });
  Container.set({
    id: "COOKS_DATA",
    transient: true,
    factory: () => sampleCooks.slice(),
  });
};

const createSubstance = (substance: Partial<Substance>): Substance =>
  plainToClass(Substance, substance);

export const mockSubstance = (len: number) => {
  const mockSubstanceInfo: Partial<Substance>[] = [];

  for (let i = 0; i < len; i++) {
    mockSubstanceInfo.push(
      createSubstance({
        substanceName: `Substance-${i}-${Math.floor(Math.random() * 1000)}`,
        substanceDesc: `Substance Desc ${i}`,
        substanceLevel: i <= 6 ? i : i % 6,
      })
    );
  }

  return mockSubstanceInfo;
};

const createTask = (task: Partial<Task>): Task => plainToClass(Task, task);

export const mockTask = (len: number) => {
  const mockTaskInfo: Partial<Task>[] = [];

  for (let i = 0; i < len; i++) {
    mockTaskInfo.push(
      createTask({
        taskTitle: `task-${i}-${Math.floor(Math.random() * 1000)}`,
        taskContent: `task-${i} content`,
        taskReward: Math.floor(Math.random() * 5000),
        taskRate: Math.floor(Math.random() * 10),
        taskSource: i <= 4 ? i : i % 4,
        taskLevel: i <= 6 ? i : i % 6,
      })
    );
  }

  return mockTaskInfo;
};

const createExecutorDesc = (desc: Partial<ExecutorDesc>): ExecutorDesc =>
  plainToClass(ExecutorDesc, desc);

const createExecutor = (executor: Partial<Executor>): Executor =>
  plainToClass(Executor, executor);

export const mockExecutor = (len: number) => {
  const mockExecutorInfo: Partial<Executor>[] = [];

  for (let i = 0; i < len; i++) {
    console.log("");
    console.log("");
    console.log(`====${i}====`);
    console.log("");
    console.log("");
    mockExecutorInfo.push(
      createExecutor({
        // name: `林不渡-${i}-${Math.floor(Math.random() * 1000)}`,
        name: `林不渡-${i}}`,
        age: Math.floor(Math.random() * 30),
        isFool: i % 2 === 0,
        desc: JSON.stringify(
          createExecutorDesc({
            level: i <= 6 ? i : i % 6,
            successRate: Math.floor(Math.random() * 100),
            satisfaction: Math.floor(Math.random() * 10),
          })
        ),
      })
    );
  }

  return mockExecutorInfo;
};

export const dbConnect = async (): Promise<any> => {
  log("[TypeORM] TypeORM Connecting");
  try {
    const connection = await TypeORM.createConnection();
    log("[TypeORM] Database Connection Established");

    const mockTaskGroup = mockTask(5);
    const mockExecutorGroup = mockExecutor(5);
    const mockSubstanceGroup = mockSubstance(5);

    await connection.manager.save(mockExecutorGroup);

    const executor = new Executor();
    executor.name = `林不渡-${Math.floor(Math.random() * 1000)}`;
    executor.tasks = (mockTaskGroup as Task[]).slice(0, 2);
    await connection.manager.save(executor);

    const sub = new Substance();
    sub.substanceName = `SCP-1128 深海巨妖-${Math.floor(Math.random() * 1000)}`;
    sub.substanceDesc = "离谱";
    sub.substanceLevel = DifficultyLevel.OLD_DOMINATOR;

    mockTaskGroup[0].taskSubstance = sub;
    await connection.manager.save(mockTaskGroup[0]);

    await connection.manager.save(mockTaskGroup);
    await connection.manager.save(mockSubstanceGroup);

    log("[TypeORM] Initial Mock Data Inserted\n");
  } catch (error) {
    log(error, "red");
  }
};
