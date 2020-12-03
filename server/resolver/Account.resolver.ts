import { Resolver, Query, Arg } from "type-graphql";
import {
  LoginOrRegisterStatus,
  LoginOrRegisterStatusHandler,
} from "../graphql/Common";

import { dispatchToken, validateToken } from "../utils/jwt";
import { RESPONSE_INDICATOR } from "../utils/constants";

// TODO: Register & Refresher Resolver
@Resolver((of) => LoginOrRegisterStatus)
export default class AccountResolver {
  // TODO: account entity system setup
  constructor(params) {}

  @Query(() => LoginOrRegisterStatus)
  // TODO: login type args
  async AccountLogin(
    @Arg("account") account: string,
    @Arg("password") password: string
  ): Promise<LoginOrRegisterStatus> {
    const token = dispatchToken(account);
    // TODO: account entity system setup
    return new LoginOrRegisterStatusHandler(
      true,
      RESPONSE_INDICATOR.SUCCESS,
      token
    );
  }

  @Query(() => LoginOrRegisterStatus)
  async CheckIsTokenValid(
    @Arg("token") token: string
  ): Promise<LoginOrRegisterStatus> {
    const { valid, info } = validateToken(token);
    if (valid) {
      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        token,
        info!.exp
      );
    } else {
      return new LoginOrRegisterStatusHandler(
        false,
        RESPONSE_INDICATOR.TOKEN_EXPIRED,
        token,
        -1
      );
    }
  }
}
