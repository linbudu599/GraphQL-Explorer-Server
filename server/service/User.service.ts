import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import User from "../entity/User";

import { Service, Inject } from "typedi";
import { IUserService } from "../typding";

@Service()
export default class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject("INIT_INJECT_DATA") private readonly dateInfo: Date
  ) {}

  async Users(cursor: number, offset: number) {
    const usersWithTasks = await this.userRepository.find({
      relations: ["tasks"],
      skip: cursor,
      take: offset,
    });

    return usersWithTasks;
  }

  async ContainerRegisterTime() {
    return this.dateInfo;
  }
}
