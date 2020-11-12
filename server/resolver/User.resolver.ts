import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  Authorized,
  UseMiddleware,
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import User from "../entity/User";
import Task from "../entity/Task";

import StatusHandler, { Status } from "../graphql/Status";
import {
  UserCreateInput,
  UserUpdateInput,
  UserQueryArgs,
} from "../graphql/User";

import { ACCOUNT_AUTH } from "../utils/constants";

import { LogAccessMiddleware } from "../middleware/log";

@Resolver((of) => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  @Authorized(ACCOUNT_AUTH.ADMIN)
  @Query(() => [User]!)
  @UseMiddleware(LogAccessMiddleware)
  async Users(): Promise<User[]> {
    // TODO: req wrapper

    const a = await this.taskRepository.find({
      where: {
        assignee: {
          uid: 1,
        },
      },

      relations: ["assignee"],
    });

    return await this.userRepository.find();
  }

  @Query(() => User)
  async FindUserById(@Arg("uid") uid: string): Promise<User | undefined> {
    // TODO: req wrapper
    // TODO: number -> string
    return this.userRepository.findOne({ uid });
  }

  @Query(() => [User]!)
  async FindUserByConditions(
    @Args({ validate: false }) conditions: UserQueryArgs
  ): Promise<User[]> {
    // TODO: req wrapper
    return await this.userRepository.find({ ...conditions });
  }

  // TODO: admin auth required
  @Mutation(() => User)
  async CreateUser(
    @Arg("newUserInfo") user: UserCreateInput
  ): Promise<(User & UserCreateInput) | undefined> {
    // TODO: validate params
    try {
      const res = await this.userRepository.save(user);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: auth
  @Mutation(() => Status, { nullable: true })
  async UpdateUser(
    @Arg("modifiedUserInfo") user: UserUpdateInput
  ): Promise<Status | undefined> {
    // TODO: find first
    try {
      const res = await this.userRepository.update({ uid: user.uid }, user);
      // TODO: res check & error handler
      return new StatusHandler(true, "Success");
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: auth
  @Mutation(() => Status, { nullable: true })
  async DeleteUser(@Arg("uid") uid: string): Promise<Status | undefined> {
    // TODO: find first
    try {
      const res = await this.userRepository.delete({ uid });
      // TODO: check res
      return new StatusHandler(true, "Success");
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: auth
  @Mutation(() => Status, { nullable: true })
  async NotLongerFull(@Arg("uid") uid: string): Promise<Status | undefined> {
    try {
      const item = await this.userRepository.update({ uid }, { isFool: false });
      return new StatusHandler(true, "Success");
    } catch (error) {
      console.error(error);
    }
  }

  // @FieldResolver()
  // async FieldRootResolver(@Root() user: User): Promise<null> {
  //   return null;
  // }
}
