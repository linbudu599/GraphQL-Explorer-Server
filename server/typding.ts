import { ContainerInstance } from "typedi";

import { ACCOUNT_TYPE } from "./utils/constants";

export interface IContext {
  env: string;
  currentUser: {
    accountId: string;
    accountType: ACCOUNT_TYPE;
  };
  container: ContainerInstance;
}
