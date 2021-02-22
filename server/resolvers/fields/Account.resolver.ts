import { Resolver, Root, FieldResolver } from "type-graphql";

import Account from "../../entities/Account";

import AccountService from "../../services/Account.service";

@Resolver((of) => Account)
export default class AccountFieldResolver {
  constructor(private readonly accountService: AccountService) {}

  // Another Resolver Composite
  @FieldResolver(() => [Account])
  async AccountFieldResolver(@Root() account: Account) {
    const res = await this.accountService.getAllAccounts({
      offset: 0,
      take: 200,
    });
    return res;
  }
}
