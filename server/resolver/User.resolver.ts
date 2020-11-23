import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  Authorized,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root,
  ResolverInterface,
} from "type-graphql";
import { Repository, Transaction, TransactionRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import User from "../entity/User";
import Task from "../entity/Task";

import UserService from "../service/User.service";

import {
  UserCreateInput,
  UserUpdateInput,
  UserQueryArgs,
} from "../graphql/User";
import { PaginationOptions, StatusHandler, Status } from "../graphql/Common";

import { ACCOUNT_AUTH, RESPONSE_INDICATOR } from "../utils/constants";
import { InjectCurrentUser, CustomArgsValidation } from "../decorators";

import { IContext } from "../typding";
import { log } from "../utils/helper";

@Resolver((of) => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService
  ) {}

  // @Authorized(ACCOUNT_AUTH.ADMIN)
  @Query(() => Status)
  async Users(
    @Ctx() ctx: IContext,
    @InjectCurrentUser() user: IContext["currentUser"],
    @Arg("pagination") { cursor, offset }: PaginationOptions
  ): Promise<Status> {
    try {
      const usersWithTasks = await this.userRepository.find({
        relations: ["tasks"],
      });
      let end = offset ? offset : usersWithTasks.length + 1;
      if (end > usersWithTasks.length) {
        end = usersWithTasks.length + 1;
      }
      return new StatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        usersWithTasks.slice(cursor ?? 0, end)
      );
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => Status)
  async FindUserById(@Arg("uid") uid: string): Promise<Status> {
    const user = await this.userRepository.findOne(
      { uid },
      {
        relations: ["tasks"],
      }
    );
    if (!user) {
      return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
    }
    return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [user]);
  }

  // Use another service to query by user.tasks
  @Query(() => Status)
  @CustomArgsValidation(UserQueryArgs)
  async FindUserByConditions(
    @Args({ validate: false }) conditions: UserQueryArgs
  ): Promise<Status> {
    try {
      const res = await this.userRepository.find({ ...conditions });
      const isEmpty = res.length === 0;
      return new StatusHandler(
        !isEmpty,
        isEmpty ? RESPONSE_INDICATOR.NOT_FOUND : RESPONSE_INDICATOR.SUCCESS,
        res
      );
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Transaction()
  @Mutation(() => Status)
  async CreateUser(
    @Arg("newUserInfo") user: UserCreateInput,
    @TransactionRepository(User)
    userTransRepo: Repository<User>
  ): Promise<Status> {
    try {
      const isExistingUser = await this.userRepository.findOne({
        name: user.name,
      });
      if (isExistingUser) {
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, []);
      }

      const res = await userTransRepo.save(user);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      // FIXME: should filter sensitive data on throwing
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Transaction()
  @Mutation(() => Status, { nullable: true })
  async UpdateUser(
    @Arg("modifiedUserInfo") user: UserUpdateInput,
    @TransactionRepository(User)
    userTransRepo: Repository<User>
  ): Promise<Status | undefined> {
    try {
      const isExistingUser = await this.userRepository.findOne({
        uid: user.uid,
      });
      if (!isExistingUser) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      // PUZZLE: should judge by generatedMaps?
      const res = await userTransRepo.update({ uid: user.uid }, user);
      const updatedItem = await this.userRepository.findOne({
        uid: user.uid,
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updatedItem]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  // TODO: constraint fix
  @Transaction()
  @Mutation(() => Status)
  async DeleteUser(
    @Arg("uid") uid: string,
    @TransactionRepository(User)
    userTransRepo: Repository<User>
  ): Promise<Status> {
    try {
      const isExistingUser = await this.userRepository.findOne(uid);
      if (!isExistingUser) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }
      const res = await userTransRepo.delete({ uid });
      console.log(res);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @FieldResolver()
  async spAgeField(
    @Root() user: User,
    @Arg("param", { nullable: true }) param?: number
  ): Promise<number> {
    // ... do sth addtional here
    return user.age;
  }
}
