import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Repository, Transaction, TransactionRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { dispatchToken, validateToken } from "../utils/jwt";
import { RESPONSE_INDICATOR } from "../utils/constants";
import { encode, compare } from "../utils/bcrypt";

import {
  LoginOrRegisterStatus,
  LoginOrRegisterStatusHandler,
} from "../graphql/Common";
import { AccountRegisterInput } from "../graphql/Account";

import Account from "../entity/Account";

// TODO: 密码加密存储 权限分级 注销（token） StatusHandler更丰富
@Resolver((of) => LoginOrRegisterStatus)
export default class AccountResolver {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  // TODO: check login type
  @Query(() => LoginOrRegisterStatus)
  async AccountLogin(
    @Arg("name") name: string,
    @Arg("pwd") password: string
  ): Promise<LoginOrRegisterStatus> {
    const account = await this.accountRepository.findOne({ accountName: name });

    if (!account) {
      return new LoginOrRegisterStatusHandler(
        false,
        RESPONSE_INDICATOR.NOT_FOUND,
        ""
      );
    }

    const { accountPwd: savedPwd } = account;
    const pass = compare(password, savedPwd);

    if (!pass) {
      return new LoginOrRegisterStatusHandler(
        false,
        RESPONSE_INDICATOR.INCORRECT_PWD,
        ""
      );
    }

    const token = dispatchToken(name);

    // TODO: refresh token
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

      account.accountPwd = encode(account.accountPwd);
      await accountTransRepo.save(account);

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
