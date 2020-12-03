import { ContainerInstance } from "typedi";

import { ACCOUNT_AUTH } from "./utils/constants";

export interface IContext {
  env: string;
  currentUser: {
    accountId: string;
    roles: ACCOUNT_AUTH;
  };
  container: ContainerInstance;
}
