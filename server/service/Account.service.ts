import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Account from "../entity/Account";
import {
  IAccount,
  AccountRegistryInput,
  AccountRelation,
} from "../graphql/Account";

export interface IAccountService {
  getAllAccounts(relations: AccountRelation[]): Promise<Account[]>;
  getOneAccount(
    accountName: string,
    relations: AccountRelation[]
  ): Promise<Account | undefined>;
  getOneAccountById(
    accountId: string,
    relations: AccountRelation[]
  ): Promise<Account | undefined>;
  createAccount(account: AccountRegistryInput): Promise<Account>;

  updateAccount(
    indicator: string,
    infoUpdate: Partial<IAccount>
  ): Promise<Account>;
  deleteAccount(accountName: string): Promise<void>;
}

@Service()
export default class AccountService implements IAccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async getAllAccounts(relations: AccountRelation[] = []): Promise<Account[]> {
    const accounts = await this.accountRepository.find({ relations });
    return accounts;
  }

  async getOneAccount(
    accountName: string,
    relations: AccountRelation[] = []
  ): Promise<Account | undefined> {
    const account = await this.accountRepository.findOne(
      { accountName },
      { relations }
    );
    return account;
  }

  async getOneAccountById(
    accountId: string,
    relations: AccountRelation[] = []
  ): Promise<Account | undefined> {
    const account = await this.accountRepository.findOne(accountId, {
      relations,
    });
    return account;
  }

  async createAccount(account: AccountRegistryInput): Promise<Account> {
    const res = await this.accountRepository.save(account);
    return res;
  }

  async updateAccount(
    indicator: string,
    infoUpdate: Partial<IAccount>
  ): Promise<Account> {
    await this.accountRepository.update(indicator, infoUpdate);

    const updatedItem = (await this.accountRepository.findOne(
      indicator
    )) as Account;

    return updatedItem;
  }

  async deleteAccount(accountName: string): Promise<void> {
    await this.accountRepository.delete({ accountName });
  }
}