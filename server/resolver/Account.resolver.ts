import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Repository, Transaction, TransactionRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { dispatchToken, validateToken } from "../utils/jwt";
import { RESPONSE_INDICATOR } from "../utils/constants";

import {
  LoginOrRegisterStatus,
  LoginOrRegisterStatusHandler,
} from "../graphql/Common";
import { AccountRegisterInput, AccountLoginInput } from "../graphql/Account";

import Account from "../entity/Account";

// TODO: 密码加密存储 权限分级 注销（token） StatusHandler更丰富
@Resolver((of) => LoginOrRegisterStatus)
export default class AccountResolver {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  @Query(() => LoginOrRegisterStatus)
  async AccountLogin(
    @Arg("name") name: string,
    @Arg("pwd") password: string
  ): Promise<LoginOrRegisterStatus> {
    const token = dispatchToken(name);
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

  @Transaction()
  @Mutation(() => LoginOrRegisterStatus, { nullable: false })
  async AccountRegistry(
    @Arg("account") account: AccountRegisterInput,
    @TransactionRepository(Account)
    accountTransRepo: Repository<Account>
  ) {
    console.log("===");
    console.log(account);

    try {
      const isExistingAccount = await this.accountRepository.findOne({
        accountName: account.accountName,
      });
      if (isExistingAccount) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.EXISTED
        );
      }

      const createRes = await accountTransRepo.save(account);

      const token = dispatchToken(account.accountName, account.loginType);

      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        token
      );
    } catch (error) {
      return new LoginOrRegisterStatusHandler(false, JSON.stringify(error), "");
    }
  }
}
