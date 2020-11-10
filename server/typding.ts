import { USER_ROLES, ACCOUNT_AUTH } from "./utils/constants";

export interface IContext {
  env: string;
  currentUser: {
    uid: string;
    roles: ACCOUNT_AUTH;
  };
}
