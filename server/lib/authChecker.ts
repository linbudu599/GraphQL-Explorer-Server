import { AuthChecker } from "type-graphql";
import { IContext } from "../typding";

export const authChecker: AuthChecker<IContext> = ({ context }): boolean => {
  console.log(context.token);
  console.log(context.roles);
  return true;
};
