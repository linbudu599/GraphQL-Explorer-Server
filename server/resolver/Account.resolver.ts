import { Resolver, Query, Arg, Mutation, UseMiddleware } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { ExtraFieldLogMiddlewareGenerator } from "../middleware/log";

import { dispatchToken, validateToken } from "../utils/jwt";
import { ACCOUNT_TYPE, RESPONSE_INDICATOR } from "../utils/constants";
import { encode, compare } from "../utils/bcrypt";

import {
  AccountStatus,
  LoginOrRegisterStatus,
  LoginOrRegisterStatusHandler,
  StatusHandler,
  AccountUnionResult,
} from "../graphql/Common";
import { AccountRegistryInput, AccountLoginInput } from "../graphql/Account";

import Account from "../entity/Account";
import { plainToClass } from "class-transformer";

@Resolver((of) => Account)
export default class AccountResolver {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  // TODO: Private + Super User Autn Required
  @Query(() => AccountStatus, {
    nullable: false,
    description: "查询所有用户",
  })
  @UseMiddleware(ExtraFieldLogMiddlewareGenerator("Check All Accounts"))
  async QueryAllAccounts(): Promise<AccountStatus> {
    try {
      const accounts = await this.accountRepository.find();
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, accounts);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => LoginOrRegisterStatus, {
    nullable: false,
    description: "账号登录",
  })
  async AccountLogin(
    @Arg("account") { accountName, accountPwd, loginType }: AccountLoginInput
  ): Promise<LoginOrRegisterStatus> {
    try {
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
    } catch (error) {
      return new LoginOrRegisterStatusHandler(false, JSON.stringify(error), "");
    }
  }

  @Query(() => LoginOrRegisterStatus, {
    nullable: false,
    description: "检验token是否合法",
  })
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

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: "新用户注册",
  })
  async AccountRegistry(
    @Arg("account") account: AccountRegistryInput
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
      await this.accountRepository.save(account);

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

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: "修改密码",
  })
  async ModifyPassword(
    @Arg("accountName") accountName: string,
    @Arg("prevPassword") prevPassword: string,
    @Arg("newPassword") newPassword: string
  ): Promise<LoginOrRegisterStatus> {
    try {
      const isExistingAccount = await this.accountRepository.findOne({
        accountName,
      });

      if (!isExistingAccount) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.NOT_FOUND
        );
      }

      if (!compare(prevPassword, isExistingAccount.accountPwd)) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.INCORRECT_PWD
        );
      }

      await this.accountRepository.update(
        { accountName },
        {
          accountPwd: encode(newPassword),
        }
      );

      const token = dispatchToken(accountName, isExistingAccount.accountType);

      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        token
      );
    } catch (error) {
      return new LoginOrRegisterStatusHandler(false, JSON.stringify(error), "");
    }
  }

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: "用户永久注销",
  })
  async AccountDestory(
    @Arg("accountName") accountName: string,
    @Arg("accountPwd") accountPwd: string
  ) {
    try {
      const isExistingAccount = await this.accountRepository.findOne({
        accountName,
      });

      if (!isExistingAccount) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.NOT_FOUND
        );
      }
      const {
        accountPwd: savedPwd,
        accountType: savedType,
      } = isExistingAccount;
      const pass = compare(accountPwd, savedPwd);

      if (!pass) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.INCORRECT_PWD,
          ""
        );
      }

      const deleteRes = await this.accountRepository.delete({ accountName });

      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        ""
      );
    } catch (error) {
      return new LoginOrRegisterStatusHandler(false, JSON.stringify(error), "");
    }
  }

  @Mutation(() => AccountUnionResult, {
    nullable: false,
    description: "提升或下降用户权限等级",
  })
  async AccountLevelMutate(
    @Arg("accountId") accountId: string,
    @Arg("level", () => ACCOUNT_TYPE) level: ACCOUNT_TYPE
  ): Promise<AccountStatus | LoginOrRegisterStatus> {
    try {
      const isExistingAccount = await this.accountRepository.findOne(accountId);

      if (!isExistingAccount) {
        return plainToClass(LoginOrRegisterStatus, {
          success: false,
          message: RESPONSE_INDICATOR.NOT_FOUND,
        });
      }

      await this.accountRepository.update(accountId, {
        accountType: level,
      });

      const updated = (await this.accountRepository.findOne(
        accountId
      )) as Account;

      return plainToClass(AccountStatus, {
        success: true,
        message: RESPONSE_INDICATOR.SUCCESS,
        data: [updated],
      });
    } catch (error) {
      return plainToClass(LoginOrRegisterStatus, {
        success: false,
        message: JSON.stringify(error),
      });
    }
  }
}
