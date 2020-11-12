import { Service } from "typedi";
import {
  MiddlewareInterface,
  NextFn,
  ResolverData,
  ArgumentValidationError,
} from "type-graphql";

import { Logger } from "../utils/logger";
import { IContext } from "../typding";

@Service()
export class ErrorLoggerMiddleware implements MiddlewareInterface<IContext> {
  constructor(private readonly logger: Logger) {}

  async use({ context, info }: ResolverData<IContext>, next: NextFn) {
    try {
      return await next();
    } catch (err) {
      this.logger.log({
        message: err.message,
        operation: info.operation.operation,
        fieldName: info.fieldName,
        uid: context.currentUser.uid,
      });
      if (!(err instanceof ArgumentValidationError)) {
        // hide errors from db like printing sql query
        throw new Error("Unknown error occurred. Try again later!");
      }
      throw err;
    }
  }
}
