import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  Root,
  FieldResolver,
  ResolverInterface,
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import User from "../entity/User";
import { Status, StatusHandler } from "../utils/helper";
import {
  UserCreateInput,
  UserUpdateInput,
  IUser,
  UserQueryArgs,
} from "../graphql/User";
import ArgsValidator from "../decorators/argsValidator";

@Resolver((of) => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(() => [User]!)
  async Users(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Query(() => User)
  async FindUserById(@Arg("uid") uid: number): Promise<User | undefined> {
    return this.userRepository.findOne({ uid });
  }

  @Query(() => [User]!)
  // @ArgsValidator(UserQueryArgs)
  async FindUserByConditions(
    @Args({ validate: false }) conditions: UserQueryArgs
  ): Promise<User[]> {
    return await this.userRepository.find({ ...conditions });
  }

  @Mutation(() => User)
  async CreateUser(
    @Arg("newUserInfo") user: UserCreateInput
  ): Promise<(User & UserCreateInput) | undefined> {
    try {
      const res = await this.userRepository.save(user);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  @Mutation(() => Status, { nullable: true })
  async UpdateUser(
    @Arg("modifiedUserInfo") user: UserUpdateInput
  ): Promise<Status | undefined> {
    try {
      const res = await this.userRepository.update({ uid: user.uid }, user);
      // TODO: res check & error handler
      return new StatusHandler(true, "Success");
    } catch (error) {
      console.error(error);
    }
  }

  @Mutation(() => Status, { nullable: true })
  async DeleteUser(@Arg("uid") uid: number): Promise<Status | undefined> {
    try {
      const res = await this.userRepository.delete({ uid });
      // TODO: check res
      return new StatusHandler(true, "Success");
    } catch (error) {
      console.error(error);
    }
  }

  @Mutation(() => Status, { nullable: true })
  async NotLongerFull(@Arg("uid") uid: number): Promise<Status | undefined> {
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
