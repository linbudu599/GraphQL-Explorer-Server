import { mapSchema, getDirectives, MapperKind } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql";

export function deprecatedDirective(directiveName: string) {
  return {
    deprecatedDirectiveTypeDefs: `directive @${directiveName}(reason: String) on FIELD_DEFINITION | ENUM_VALUE`,
    deprecatedDirectiveTransformer: (schema: GraphQLSchema) =>
      // mapSchema会创建一个原本schema的copy 转化指定的GraphQL Object(MapperKind?)
      // 再重新生成schema
      // "then rewires the entire schema such that all GraphQL objects
      // that refer to other GraphQL objects correctly point to the new set"
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          // 提取所有指令
          const directives = getDirectives(schema, fieldConfig);
          const directiveArgumentMap = directives[directiveName];
          if (directiveArgumentMap) {
            fieldConfig.deprecationReason = directiveArgumentMap.reason;
            return fieldConfig;
          }
        },
        [MapperKind.ENUM_VALUE]: (enumValueConfig) => {
          const directives = getDirectives(schema, enumValueConfig);
          const directiveArgumentMap = directives[directiveName];
          if (directiveArgumentMap) {
            enumValueConfig.deprecationReason = directiveArgumentMap.reason;
            return enumValueConfig;
          }
        },
      }),
  };
}
