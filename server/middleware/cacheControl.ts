import { CacheHint, CacheScope } from "apollo-cache-control";
import { UseMiddleware } from "type-graphql";

// 只是供Apollo-Engine使用的缓存
const CacheControl = (hint: CacheHint) => {
  return UseMiddleware(({ info }, next) => {
    console.log("Called CacheControl");
    info.cacheControl.setCacheHint(hint);
    return next();
  });
};

export const RecipeCacheHint: CacheHint = {
  maxAge: 60 * 60 * 1000,
  scope: CacheScope.Public,
};

export default CacheControl;
