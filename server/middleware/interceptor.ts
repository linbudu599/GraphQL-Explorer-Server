import chalk from "chalk";
import { MiddlewareFn } from "type-graphql";
import { IUser } from "../graphql/User";

// intercept exeuction result
const InterceptorOnUIDFeild = (uid: number): MiddlewareFn => async (
  { root },
  next
) => {
  const res = await next();

  if (res?.uid === uid) {
    return {
      ...res,
      name: "modified in interceptor",
    };
  }

  return res;
};

const InterceptorOnUid1: MiddlewareFn = InterceptorOnUIDFeild(1);

export default InterceptorOnUid1;
