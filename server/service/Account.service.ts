import { Service } from "typedi";
import { FindConditions, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Account from "../entity/Account";
import { IAccount, AccountRegistryInput } from "../graphql/Account";

export interface IAccountService {
  getAllAccounts(): Promise<Account[]>;
  getOneAccount(accountName: string): Promise<Account | undefined>;
  getOneAccountById(accountId: string): Promise<Account | undefined>;
  createAccount(account: AccountRegistryInput): Promise<Account>;

  updateAccount(
    indicator: Partial<IAccount>,
    infoUpdate: Partial<IAccount>
  ): Promise<void>;
  deleteAccount(accountName: string): Promise<void>;
}

@Service()
export default class AccountService implements IAccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async getAllAccounts(): Promise<Account[]> {
    const accounts = await this.accountRepository.find();
    return accounts;
  }

  async getOneAccount(accountName: string): Promise<Account | undefined> {
    const account = await this.accountRepository.findOne({ accountName });
    return account;
  }

  async getOneAccountById(accountId: string): Promise<Account | undefined> {
    const account = await this.accountRepository.findOne(accountId);
    return account;
  }

  async createAccount(account: AccountRegistryInput): Promise<Account> {
    const res = await this.accountRepository.save(account);
    return res;
  }

  async updateAccount(
    indicator: FindConditions<IAccount> | string,
    infoUpdate: Partial<IAccount>
  ): Promise<void> {
    await this.accountRepository.update(indicator, infoUpdate);
  }

  async deleteAccount(accountName: string): Promise<void> {
    await this.accountRepository.delete({ accountName });
  }
}
