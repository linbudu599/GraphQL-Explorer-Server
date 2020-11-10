import { MiddlewareFn } from "type-graphql";
import { log } from "../utils/";

// intercept exeuction result
const InterceptorOnUIDFeild = (uid: number): MiddlewareFn => async (
  { root },
  next
) => {
  const res = await next();

  log("[Interceptor] UID Interceptor Invoked");

  if (res?.uid === uid) {
    log(`[Interceptor] UID ${uid} intercepted`);
    return {
      ...res,
      name: "modified in interceptor",
    };
  }

  return res;
};

const InterceptorOnUid1: MiddlewareFn = InterceptorOnUIDFeild(1);

export default InterceptorOnUid1;
