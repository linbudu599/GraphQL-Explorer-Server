import { Service } from "typedi";
import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import { getLoggerExtensions, log } from "../utils/helper";

import { Logger } from "../utils/logger";
import { IContext } from "../typding";

@Service()
export default class LogAccessMiddleware
  implements MiddlewareInterface<IContext> {
  constructor(private readonly logger: Logger) {}

  async use({ context, info }: ResolverData<IContext>, next: NextFn) {
    const { message, level = 0 } = getLoggerExtensions(info);

    log("=== [LogAccessMiddleware Start] ===");

    if (message) {
      this.logger.log(`message: ${message}, level: ${level}`);
    }

    this.logger.log(
      `Logging Access: UID ${context.currentUser.uid} -> ${info.parentType.name}.${info.fieldName}`
    );

    log("=== [LogAccessMiddleware End] ===");

    return await next();
  }
}
