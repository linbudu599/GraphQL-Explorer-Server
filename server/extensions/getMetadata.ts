import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { IContext } from "../typing";
import { log } from "../utils/helper";

/**
 * Extract metadata from `info.fieldName`
 *
 * @export
 * @class ExtensionsMetadataRetriever
 * @implements {MiddlewareInterface<IContext>}
 */
export class ExtensionsMetadataRetriever
  implements MiddlewareInterface<IContext> {
  use({ info }: ResolverData, next: NextFn) {
    const extensions =
      info.parentType.getFields()[info.fieldName].extensions ?? {};

    log(
      `[Extension Metadata] ${info.fieldName}: ${JSON.stringify(extensions)}`
    );
    return next();
  }
}