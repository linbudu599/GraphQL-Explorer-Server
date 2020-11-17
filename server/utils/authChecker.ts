import { AuthChecker } from "type-graphql";
import { IContext } from "../typding";
import { log } from "./helper";

export const authChecker: AuthChecker<IContext> = (
  {
    root,
    args,
    context: {
      currentUser: { uid, roles: userRoleLevel },
    },
    info,
  },
  requiredLevelGroup
): boolean => {
  const requiredLevel = Number(requiredLevelGroup[0]);
  log(`[Auth Check] Current User UID: ${uid}`);
  log(`[Auth Check] Current User Role: ${userRoleLevel}`);

  return userRoleLevel >= requiredLevel;
};
