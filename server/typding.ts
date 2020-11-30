import { ContainerInstance } from 'typedi';

import User from './entity/User';
import Task from './entity/Task';

import {
  UserCreateInput,
  UserQueryArgs,
  UserUpdateInput,
} from './graphql/User';
import { Recipe } from './graphql/Recipe';

import { USER_ROLES, ACCOUNT_AUTH } from './utils/constants';
import { DeleteResult } from 'typeorm';

export interface IContext {
  env: string;
  currentUser: {
    uid: string;
    roles: ACCOUNT_AUTH;
  };
  container: ContainerInstance;
}

export interface IUserService {
  // Query
  Users(cursor: number, offset: number): Promise<User[]>;
  ContainerRegisterTime(): Promise<Date>;
}

export interface IRecipeService {
  getAllRecipes(): Promise<Recipe[]>;
}
