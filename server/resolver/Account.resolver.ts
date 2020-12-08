import { validate } from "class-validator";
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
import { AccountRegistryInput, AccountLoginInput } from "../graphql/Account";

import Account from "../entity/Account";

@Resolver((of) => LoginOrRegisterStatus)
export default class AccountResolver {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  @Query(() => LoginOrRegisterStatus)
  async AccountLogin(
    @Arg("account") { accountName, accountPwd, loginType }: AccountLoginInput
  ): Promise<LoginOrRegisterStatus> {
    const account = await this.accountRepository.findOne({ accountName });

    if (!account) {
      return new LoginOrRegisterStatusHandler(
        false,
        RESPONSE_INDICATOR.NOT_FOUND,
        ""
      );
    }

    const { accountPwd: savedPwd, accountType: savedType } = account;
    const pass = compare(accountPwd, savedPwd);

    if (!pass) {
      return new LoginOrRegisterStatusHandler(
        false,
        RESPONSE_INDICATOR.INCORRECT_PWD,
        ""
      );
    }

    if (savedType !== loginType) {
      return new LoginOrRegisterStatusHandler(
        false,
        RESPONSE_INDICATOR.INVALID_LOGIN_TYPE,
        ""
      );
    }

    const token = dispatchToken(accountName, loginType);

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
    const validateRes = validateToken(token);

    if (validateRes.valid) {
      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        token,
        validateRes.info.exp
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
    @Arg("account") account: AccountRegistryInput,
    @TransactionRepository(Account)
    accountTransRepo: Repository<Account>
  ): Promise<LoginOrRegisterStatus> {
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

  @Transaction()
  @Mutation(() => LoginOrRegisterStatus, { nullable: false })
  async ModifyPassword(
    @Arg("accountName") accountName: string,
    @Arg("accountName") newPassword: string,

    @TransactionRepository(Account)
    accountTransRepo: Repository<Account>
  ): Promise<LoginOrRegisterStatus> {
    try {
      const isExistingAccount = await this.accountRepository.findOne({
        accountName,
      });
      if (isExistingAccount) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.NOT_FOUND
        );
      }

      await accountTransRepo.update(
        { accountName },
        {
          accountPwd: newPassword,
        }
      );

      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        ""
      );
    } catch (error) {
      return new LoginOrRegisterStatusHandler(false, JSON.stringify(error), "");
    }
  }
}
