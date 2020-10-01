import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import log4js, { Logger } from "log4js";

log4js.configure({
  appenders: {
    typeGraphQLLog: { type: "file", filename: "type-grapgql.log" },
    apolloLog: { type: "file", filename: "apollo-server.log" },
  },
  categories: { typeGraphQL: { appenders: ["typeGraphQLLog"], level: "info" } },
});

export default class LogMiddleware implements MiddlewareInterface {
  public logger: Logger;
  constructor() {
    this.logger = log4js.getLogger("typeGraphQL");
  }

  // log for TypeGraphQL
  async use({ context, info }: ResolverData, next: NextFn) {
    console.log("111111");
    this.logger.log(
      `context: ${JSON.stringify(context)}, info: ${JSON.stringify(info)}`
    );
    return await next();
  }
}
