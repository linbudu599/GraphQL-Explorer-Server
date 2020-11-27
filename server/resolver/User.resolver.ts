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
} from 'type-graphql';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import User from '../entity/User';
import Task from '../entity/Task';

import UserService from '../service/User.service';

import {
  UserCreateInput,
  UserUpdateInput,
  UserQueryArgs,
} from '../graphql/User';
import {
  PaginationOptions,
  StatusHandler,
  TaskStatus,
  UserStatus,
} from '../graphql/Common';

import { ACCOUNT_AUTH, RESPONSE_INDICATOR } from '../utils/constants';
import { InjectCurrentUser, CustomArgsValidation } from '../decorators';

import { ExtraFieldLogMiddlewareGenerator } from '../middleware/log';

import { IContext } from '../typding';
import { log } from '../utils/helper';

@Resolver((of) => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService
  ) {}

  // 先给个最低权限
  @Authorized(ACCOUNT_AUTH.UN_LOGIN)
  @Query(() => UserStatus)
  @UseMiddleware(ExtraFieldLogMiddlewareGenerator('CHECK ALL USERS'))
  async Users(
    @Ctx() ctx: IContext,
    @InjectCurrentUser() user: IContext['currentUser'],
    @Arg('pagination', { nullable: true })
    pagination: PaginationOptions
  ): Promise<UserStatus> {
    try {
      const { cursor, offset } = pagination ?? { cursor: 0, offset: 5 };
      const usersWithTasks = await this.userService.Users(cursor!, offset!);

      return new StatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        usersWithTasks
      );
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => UserStatus)
  async FindUserById(@Arg('uid') uid: string): Promise<UserStatus> {
    const user = await this.userRepository.findOne(
      { uid },
      {
        relations: ['tasks'],
      }
    );
    if (!user) {
      return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
    }
    return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [user]);
  }

  @Query(() => UserStatus)
  @CustomArgsValidation(UserQueryArgs)
  async FindUserByConditions(
    @Args({ validate: false }) conditions: UserQueryArgs
  ): Promise<UserStatus> {
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
  @Mutation(() => UserStatus)
  async CreateUser(
    @Arg('newUserInfo') user: UserCreateInput,
    @TransactionRepository(User)
    userTransRepo: Repository<User>
  ): Promise<UserStatus> {
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
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Transaction()
  @Mutation(() => UserStatus, { nullable: true })
  async UpdateUser(
    @Arg('modifiedUserInfo') user: UserUpdateInput,
    @TransactionRepository(User)
    userTransRepo: Repository<User>
  ): Promise<UserStatus> {
    try {
      const isExistingUser = await this.userRepository.findOne({
        uid: user.uid,
      });
      if (!isExistingUser) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      const res = await userTransRepo.update({ uid: user.uid }, user);
      const updatedItem = await this.userRepository.findOne({
        uid: user.uid,
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updatedItem]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Transaction()
  @Mutation(() => TaskStatus)
  async DeleteUser(
    @Arg('uid') uid: string,
    @TransactionRepository(User)
    userTransRepo: Repository<User>,
    @TransactionRepository(Task)
    taskTransRepo: Repository<Task>
  ): Promise<TaskStatus> {
    try {
      const isExistingUser = await userTransRepo.findOne(uid);
      if (!isExistingUser) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }
      // TODO: 抽离到Task.service中
      const hasAssignedTask = await taskTransRepo.find({
        where: {
          assignee: {
            uid,
          },
        },
      });

      if (!hasAssignedTask) {
        await userTransRepo.delete(uid);
      } else {
        await taskTransRepo.update(
          {
            assignee: {
              uid,
            },
          },
          {
            assignee: undefined,
          }
        );
      }

      await userTransRepo.delete({ uid });
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, []);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @FieldResolver()
  async spAgeField(
    @Root() user: User,
    @Arg('param', { nullable: true }) param?: number
  ): Promise<number> {
    // ... do sth addtional here
    return user.age;
  }

  @Query(() => UserStatus)
  async InjectDataFromService() {
    const registerDate = await this.userService.ContainerRegisterTime();
    const data = {
      time: registerDate,
    };
    return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [data]);
  }
}
