import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Root,
  FieldResolver,
  Int,
} from "type-graphql";
import { plainToClass } from "class-transformer";

import {
  AccountStatus,
  LoginOrRegisterStatus,
  LoginOrRegisterStatusHandler,
  StatusHandler,
  AccountUnionResult,
  PaginationOptions,
} from "../graphql/Common";
import {
  AccountRegistryInput,
  AccountLoginInput,
  AccountProfileInput,
  AccountPasswordModifyInput,
  AccountRelationsInput,
  AccountRelation,
  getAccountRelations,
} from "../graphql/Account";

import Account, { AccountProfile } from "../entity/Account";

import AccountService from "../service/Account.service";

import { ExtraFieldLogMiddlewareGenerator } from "../middleware/log";

import { dispatchToken, validateToken } from "../utils/jwt";
import {
  ACCOUNT_TYPE,
  RESPONSE_INDICATOR,
  DEFAULT_QUERY_PAGINATION,
} from "../utils/constants";
import { encode, compare } from "../utils/bcrypt";

@Resolver((of) => Account)
export default class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  // TODO: Private + Super User Autn Required
  @Query(() => AccountStatus, {
    nullable: false,
    description: "查询所有用户",
  })
  @UseMiddleware(ExtraFieldLogMiddlewareGenerator("Check All Accounts"))
  async QueryAllAccounts(
    @Arg("pagination", { nullable: true })
    pagination: PaginationOptions,

    @Arg("relations", (type) => AccountRelationsInput, { nullable: true })
    relationOptions: Partial<AccountRelationsInput> = {}
  ): Promise<AccountStatus> {
    try {
      const queryPagination = (pagination ??
        DEFAULT_QUERY_PAGINATION) as Required<PaginationOptions>;
      const relations: AccountRelation[] = getAccountRelations(relationOptions);

      const accounts = await this.accountService.getAllAccounts(
        queryPagination,
        relations
      );
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
    @Arg("account", (type) => AccountLoginInput)
    { accountName, accountPwd, loginType }: AccountLoginInput
  ): Promise<LoginOrRegisterStatus> {
    try {
      const account = await this.accountService.getOneAccount(accountName);
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

  @Query(() => AccountStatus, {
    nullable: false,
    description: "账号详情",
  })
  async CheckAccountDetail(
    @Arg("accountId", (type) => Int) accountId: number,

    @Arg("relations", (type) => AccountRelationsInput, { nullable: true })
    relationOptions: Partial<AccountRelationsInput> = {}
  ): Promise<AccountStatus> {
    const relations: AccountRelation[] = getAccountRelations(relationOptions);
    const account = await this.accountService.getOneAccountById(
      accountId,
      relations
    );
    if (!account) {
      return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
    }

    return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [account]);
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

  @Query(() => LoginOrRegisterStatus, {
    nullable: false,
    description: "验证邮件",
  })
  async CheckVerifyCode(): Promise<LoginOrRegisterStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: "新用户注册",
  })
  async AccountRegistry(
    @Arg("account", (type) => AccountRegistryInput)
    account: AccountRegistryInput
  ): Promise<LoginOrRegisterStatus> {
    try {
      const isExistingAccount = await this.accountService.getOneAccount(
        account.accountName
      );

      if (isExistingAccount) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.EXISTED
        );
      }

      account.accountPwd = encode(account.accountPwd);
      await this.accountService.createAccount(account);

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
    @Arg("accountInfo", (type) => AccountPasswordModifyInput)
    {
      accountId,
      accountName,
      prevPassword,
      newPassword,
    }: AccountPasswordModifyInput
  ): Promise<LoginOrRegisterStatus> {
    try {
      const isExistingAccount = await this.accountService.getOneAccountById(
        accountId
      );

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

      await this.accountService.updateAccount(accountId, {
        accountPwd: encode(newPassword),
      });

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
      const isExistingAccount = await this.accountService.getOneAccount(
        accountName
      );

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

      await this.accountService.deleteAccount(accountName);

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
    @Arg("accountId", (type) => Int) accountId: number,
    @Arg("level", (type) => ACCOUNT_TYPE) level: ACCOUNT_TYPE
  ): Promise<AccountStatus | LoginOrRegisterStatus> {
    try {
      const isExistingAccount = await this.accountService.getOneAccountById(
        accountId
      );

      if (!isExistingAccount) {
        return plainToClass(LoginOrRegisterStatus, {
          success: false,
          message: RESPONSE_INDICATOR.NOT_FOUND,
        });
      }

      const updated = await this.accountService.updateAccount(accountId, {
        accountType: level,
      });

      return plainToClass(AccountStatus, {
        success: true,
        message: RESPONSE_INDICATOR.SUCCESS,
        data: [updated],
      });
    } catch (error) {
      return plainToClass(LoginOrRegisterStatus, {
        success: false,
        message: JSON.stringify(error),
        token: "",
      });
    }
  }

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: "发送邮件验证码",
  })
  async SendEmailVerifyCode(): Promise<LoginOrRegisterStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: "发送短信验证码",
  })
  async SendPhoneVerifyCode(): Promise<LoginOrRegisterStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, "");
  }

  @Mutation(() => AccountStatus, {
    nullable: false,
    description: "账号详情变更",
  })
  async MutateAccountProfile(
    @Arg("accountId", (type) => Int) accountId: number,
    @Arg("modifiedAccountProfile") accountProfile: AccountProfileInput
  ): Promise<AccountStatus> {
    try {
      const account = await this.accountService.getOneAccountById(accountId);
      if (!account) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.NOT_FOUND,
          ""
        );
      }

      const updatedProfile = {
        ...JSON.parse(account.accountProfile),
        ...accountProfile,
      };

      const res = await this.accountService.updateAccount(accountId, {
        accountProfile: JSON.stringify(updatedProfile),
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => AccountStatus, {
    nullable: false,
    description: "冻结账号",
  })
  async FreezeAccount(
    @Arg("accountId", (type) => Int) accountId: number
  ): Promise<AccountStatus> {
    try {
      const account = await this.accountService.getOneAccountById(accountId);
      if (!account) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.NOT_FOUND,
          ""
        );
      }

      const res = await this.accountService.updateAccount(accountId, {
        accountAvaliable: false,
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @FieldResolver(() => AccountProfile, {
    nullable: false,
    description: "账号资料",
  })
  async AccountProfileField(@Root() account: Account): Promise<AccountProfile> {
    const { accountProfile } = account;
    return JSON.parse(accountProfile);
  }
}
