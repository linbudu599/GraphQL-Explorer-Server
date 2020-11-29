import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql';
import { IContext } from '../typding';
import { log } from '../utils/helper';

export class ExtensionsMetadataRetriever
  implements MiddlewareInterface<IContext> {
  use({ info }: ResolverData, next: NextFn) {
    // resolver中获取同理
    const extensions =
      info.parentType.getFields()[info.fieldName].extensions ?? {};

    // log("=== Extension Metadata ===");
    // console.log(info.fieldName);
    // console.log(extensions);
    return next();
  }
}
