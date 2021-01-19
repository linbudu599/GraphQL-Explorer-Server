import { AuthChecker } from "type-graphql";
import { IContext } from "../typding";
import { log } from "./helper";
import { ACCOUNT_TYPE, ACCOUNT_ROLE } from "./constants";

export const authChecker: AuthChecker<IContext> = (
  {
    root,
    args,
    context: {
      currentUser: { accountId, accountType },
    },
    info,
  },
  requiredTypes
): boolean => {
  log(`[Auth Check] Current User ID: ${accountId}`);
  log(`[Auth Check] Current User Type: ${accountType}`);
  log(`[Auth Check] Required Types: ${requiredTypes}`);

  // return requiredTypes && requiredTypes.length
  //   ? requiredTypes.includes(accountType)
  //   : accountType !== ACCOUNT_TYPE.UN_LOGIN;
  return true;
};
