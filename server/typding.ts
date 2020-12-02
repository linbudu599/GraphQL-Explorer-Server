import { ContainerInstance } from "typedi";

import Executor from "./entity/Executor";
import Task from "./entity/Task";

import {
  ExecutorCreateInput,
  ExecutorQueryArgs,
  ExecutorUpdateInput,
} from "./graphql/Executor";
import { Recipe } from "./graphql/Recipe";

import { ACCOUNT_AUTH } from "./utils/constants";
import { DeleteResult } from "typeorm";

export interface IContext {
  env: string;
  currentUser: {
    accountId: string;
    roles: ACCOUNT_AUTH;
  };
  container: ContainerInstance;
}

export interface IExecutorService {
  // Query
  Executors(cursor: number, offset: number): Promise<Executor[]>;
  ContainerRegisterTime(): Promise<Date>;
}

export interface IRecipeService {
  getAllRecipes(): Promise<Recipe[]>;
}
