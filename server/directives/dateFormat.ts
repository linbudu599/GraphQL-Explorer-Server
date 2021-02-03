import { GraphQLField, defaultFieldResolver, GraphQLString } from "graphql";
import { SchemaDirectiveVisitor } from "graphql-tools";
import DateFormatter from "dateformat";

export class DateFormatDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    const { format } = this.args;
    field.resolve = async (...args) => {
      console.log(
        `@date invoked on ${args[3].parentType}.${args[3].fieldName}`
      );
      const date = await resolve.apply(this, args);
      return DateFormatter(date, format);
    };
    // The formatted Date becomes a String, so the field type must change:
    field.type = GraphQLString;
  }
}
