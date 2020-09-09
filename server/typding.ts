import { USER_ROLES } from "./utils/constants";

export interface IContext {
  token: string;
  roles: USER_ROLES[];
}
