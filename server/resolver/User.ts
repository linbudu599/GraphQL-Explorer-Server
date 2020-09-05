import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import User, { UserInputOrArgs } from "../entity/User";
import { Status, StatusHandler } from "../utils/helper";

@Resolver(() => User)
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

  @Mutation(() => User)
  async CreateUser(
    @Arg("newUserInfo") user: UserInputOrArgs
  ): Promise<(User & UserInputOrArgs) | undefined> {
    try {
      const res = await this.userRepository.save(user);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  @Mutation(() => Status, { nullable: true })
  async UpdateUser(
    @Arg("modifiedUserInfo") user: UserInputOrArgs
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
}
