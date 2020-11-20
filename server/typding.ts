import { ContainerInstance } from "typedi";
import { Recipe } from "./graphql/Recipe";
import { USER_ROLES, ACCOUNT_AUTH } from "./utils/constants";

export interface IContext {
  env: string;
  currentUser: {
    uid: string;
    roles: ACCOUNT_AUTH;
  };
  container: ContainerInstance;
}

export interface IUserService {
  someMethod(methodName: string): Promise<string>;
}

export interface IRecipeService {
  getAllRecipes(): Promise<Recipe[]>;
}
