import { Service, Inject } from "typedi";

import { IUserService } from "../typding";

@Service()
export default class UserService implements IUserService {
  constructor(@Inject("INIT_INJECT_DATA") private readonly dateInfo: Date) {}

  async someMethod(methodName: string) {
    console.log(this.dateInfo);
    return "User Servie Injected!";
  }
}
