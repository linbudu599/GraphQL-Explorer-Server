import { Service } from "typedi";
import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
// import log4js, { Logger } from "log4js";

import { Logger } from "../utils/logger";
import { IContext } from "../typding";

// log4js.configure({
//   appenders: {
//     typeGraphQLLog: { type: "file", filename: "type-grapgql.log" },
//     apolloLog: { type: "file", filename: "apollo-server.log" },
//   },
//   categories: { typeGraphQL: { appenders: ["typeGraphQLLog"], level: "info" } },
// });

// export default class LogMiddleware implements MiddlewareInterface {
//   public logger: Logger;
//   constructor() {
//     this.logger = log4js.getLogger("typeGraphQL");
//   }

//   // log for TypeGraphQL
//   async use({ context, info }: ResolverData, next: NextFn) {
//     this.logger.log(
//       `context: ${JSON.stringify(context)}, info: ${JSON.stringify(info)}`
//     );
//     return await next();
//   }
// }

@Service()
export class LogAccessMiddleware implements MiddlewareInterface<IContext> {
  constructor(private readonly logger: Logger) {}

  async use({ context, info }: ResolverData<IContext>, next: NextFn) {
    this.logger.log(
      `Logging access: UID ${context.currentUser.uid} -> ${info.parentType.name}.${info.fieldName}`
    );
    return await next();
  }
}
