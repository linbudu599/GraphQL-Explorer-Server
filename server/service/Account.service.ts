import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import Account from "../entity/Account";
import {
  IAccount,
  AccountRegistryInput,
  AccountRelation,
} from "../graphql/Account";

import { PaginationOptions } from "../graphql/Common";

export interface IAccountService {
  getAllAccounts(
    pagination: Required<PaginationOptions>,

    relations: AccountRelation[]
  ): Promise<Account[]>;
  getOneAccount(
    accountName: string,
    relations: AccountRelation[]
  ): Promise<Account | undefined>;
  getOneAccountById(
    accountId: number,
    relations: AccountRelation[]
  ): Promise<Account | undefined>;

  createAccount(account: AccountRegistryInput): Promise<Account>;

  updateAccount(
    indicator: number,
    infoUpdate: Partial<IAccount>
  ): Promise<Account>;
  deleteAccount(accountId: number): Promise<void>;
}

@Service()
export default class AccountService implements IAccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  private generateSelectBuilder(relations: AccountRelation[]) {
    let selectQueryBuilder = this.accountRepository.createQueryBuilder(
      "account"
    );

    if (relations.includes("relatedRecord")) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        "account.relatedRecord",
        "records"
      );
    } else {
      // 如果关系中不包含relatedRecord, 就不能进行后面的查询
      return selectQueryBuilder;
    }

    if (relations.includes("recordExecutor")) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        "records.recordExecutor",
        "executor"
      );
    }

    if (relations.includes("recordTask")) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        "records.recordTask",
        "task"
      );
    }

    if (relations.includes("recordSubstance")) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        "records.recordSubstance",
        "substance"
      );
    }

    return selectQueryBuilder;
  }

  async getAllAccounts(
    pagination: Required<PaginationOptions>,

    relations: AccountRelation[] = []
  ): Promise<Account[]> {
    const { cursor, offset } = pagination;

    const accounts = await this.generateSelectBuilder(relations)
      .take(offset)
      .skip(cursor)
      .getMany();

    return accounts;
  }

  async getOneAccount(
    accountName: string,
    relations: AccountRelation[] = []
  ): Promise<Account | undefined> {
    const account = await this.generateSelectBuilder(relations)
      .where("account.accountName = :accountName", { accountName })
      .getOne();

    return account;
  }

  async getOneAccountById(
    accountId: number,
    relations: AccountRelation[] = []
  ): Promise<Account | undefined> {
    const account = await this.generateSelectBuilder(relations)
      .where("account.accountId = :accountId", { accountId })
      .getOne();

    return account;
  }

  async createAccount(account: AccountRegistryInput): Promise<Account> {
    const res = await this.accountRepository.save(account);
    return res;
  }

  async updateAccount(
    indicator: number,
    infoUpdate: Partial<IAccount>
  ): Promise<Account> {
    await this.accountRepository.update(indicator, infoUpdate);

    const updatedItem = (await this.getOneAccountById(indicator))!;

    return updatedItem;
  }

  async deleteAccount(accountId: number): Promise<void> {
    await this.accountRepository
      .createQueryBuilder()
      .delete()
      .from(Account)
      .where("accountId = :accountId")
      .setParameter("accountId", accountId)
      .execute();
  }
}