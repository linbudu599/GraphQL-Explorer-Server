import * as TypeORM from 'typeorm';
import Container from 'typedi';
import { plainToClass } from 'class-transformer';
import {
  Difficulty,
  CompanyScale,
  Cook,
  Recipe,
  Company,
  SaltFish,
  WorkExperience,
} from '../graphql/Recipe';
import User from '../entity/User';
import Task from '../entity/Task';
import { log } from './helper';

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
    name: 'XX有限公司',
    scale: CompanyScale.Small,
    registerDate: new Date(),
    description: '小公司罢了',
  }),
  createCompany({
    name: '不渡科技有限公司',
    scale: CompanyScale.Huge,
    registerDate: new Date(),
    description: '我直接世界500强',
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
    name: 'Gordon Ramsay',
    yearsOfExperience: 21,
    experience: sampleWorkExperience[0],
  }),
  createCook({
    name: 'Kim Kardashian',
    yearsOfExperience: 1,
    experience: sampleWorkExperience[1],
  }),
];

export const sampleRecipes = [
  createRecipe({
    title: 'Recipe 1',
    description: 'Desc 1',
    preparationDifficulty: Difficulty.Easy,
    ingredients: ['one', 'two', 'three'],
    cook: sampleCooks[1],
  }),
  createRecipe({
    title: 'Recipe 2',
    description: 'Desc 2',
    preparationDifficulty: Difficulty.Easy,
    ingredients: ['four', 'five', 'six'],
    cook: sampleCooks[0],
  }),
  createRecipe({
    title: 'Recipe 3',
    description: 'Desc 3',
    preparationDifficulty: Difficulty.Beginner,
    ingredients: ['seven', 'eight', 'nine'],
    cook: sampleCooks[1],
  }),
  createRecipe({
    title: 'Recipe 4',
    description: 'Desc 4',
    preparationDifficulty: Difficulty.MasterChef,
    ingredients: ['ten', 'eleven', 'twelve'],
    cook: sampleCooks[0],
  }),
  createRecipe({
    title: 'Recipe 5',
    description: 'Desc 5',
    preparationDifficulty: Difficulty.Hard,
    ingredients: ['thirteen', 'fourteen', 'fifteen'],
    cook: sampleCooks[0],
  }),
];

export const setRecipeInContainer = (): void => {
  log('[TypeDI] Recipe Set to Container');
  Container.set({
    id: 'RECIPES_DATA',
    // create a copy for each request
    transient: true,
    factory: () => sampleRecipes.slice(),
  });
};

const createTask = (task: Partial<Task>): Task => plainToClass(Task, task);

export const mockTask = (len: number) => {
  const mockTaskInfo: Partial<Task>[] = [];

  for (let i = 0; i < len; i++) {
    mockTaskInfo.push(
      createTask({
        taskTitle: `task-${i}`,
        taskContent: `task-${i} content`,
        taskReward: Math.floor(Math.random() * 5000),
        taskRate: Math.floor(Math.random() * 10),
      })
    );
  }

  return mockTaskInfo;
};

const createUser = (user: Partial<User>): User => plainToClass(User, user);

export const mockUser = (len: number) => {
  const mockUserInfo: Partial<User>[] = [];

  for (let i = 0; i < len; i++) {
    mockUserInfo.push(
      createUser({
        name: `林不渡-${i}`,
        age: Math.floor(Math.random() * 30),
        isFool: i % 2 === 0,
      })
    );
  }

  return mockUserInfo;
};

export const dbConnect = async (): Promise<any> => {
  log('=== [TypeORM] TypeORM Connecting ===');
  try {
    const connection = await TypeORM.createConnection({
      type: 'sqlite',
      name: 'default',
      // use different databse
      database: './info.db',
      // disabled in prod
      synchronize: true,
      dropSchema: true,
      logging: 'all',
      maxQueryExecutionTime: 1000,
      logger: 'advanced-console',
      entities: [
        process.env.NODE_ENV === 'development'
          ? 'server/entity/*.ts'
          : 'server-dist/entity/*.js',
      ],
      cache: {
        duration: 3000,
      },
    });
    log('=== [TypeORM] Database Connection Established ===');

    const mockTaskGroup = mockTask(5);
    const mockUserGroup = mockUser(5);

    await connection.manager.save(mockTaskGroup);
    await connection.manager.save(mockUserGroup);

    const user = new User();
    user.name = '林不渡-Lv1';
    user.tasks = (mockTaskGroup as Task[]).slice(0, 2);
    await connection.manager.save(user);

    log('=== [TypeORM] Initial Mock Data Inserted ===\n');
  } catch (error) {
    log(error, 'red');
  }
};
