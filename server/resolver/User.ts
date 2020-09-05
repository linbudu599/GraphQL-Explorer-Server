import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import User, { UserInput } from "../entity/User";

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
    @Arg("newUserInfo") user: UserInput
  ): Promise<User | undefined> {
    try {
      const res = this.userRepository.save(user);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
