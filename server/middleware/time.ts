import { MiddlewareFn } from "type-graphql";

const ResolveTimeMiddleware: MiddlewareFn = async (
  { root, args, context, info },
  next
) => {
  const start = Date.now();
  await next();
  const resolveTime = Date.now() - start;
  console.log(`${info.parentType.name}.${info.fieldName} [${resolveTime} ms]`);
};

export default ResolveTimeMiddleware;
