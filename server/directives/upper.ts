import { GraphQLField, defaultFieldResolver } from "graphql";
import { SchemaDirectiveVisitor } from "graphql-tools";

export class UpperDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    // 覆盖原本的resolve方法 感觉有点像interceptor 但是灵活得多
    // args: [source args context info]
    field.resolve = async (...args) => {
      console.log(
        `@upper invoked on ${args[3].parentType}.${args[3].fieldName}`
      );
      const result = await resolve.apply(this, args);
      if (typeof result === "string") {
        return result.toLocaleUpperCase();
      }

      return result;
    };
  }
}
