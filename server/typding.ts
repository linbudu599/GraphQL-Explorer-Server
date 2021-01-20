import { ContainerInstance } from "typedi";

import { ACCOUNT_TYPE, ACCOUNT_ROLE } from "./utils/constants";

export interface IContext {
  currentUser: {
    accountId: number;
    accountType: ACCOUNT_TYPE;
    accountRole: ACCOUNT_ROLE;
  };
  container: ContainerInstance;
}
