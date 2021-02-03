import {
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
} from "graphql";

import { SchemaDirectiveVisitor } from "graphql-tools";
import { LimitedLengthScalarType } from "../scalars/LimitedLength";

export class LengthRestrictionDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition(
    field: GraphQLInputField,
    details: {
      objectType: GraphQLInputObjectType;
    }
  ) {
    this.wrapType(field);
  }

  visitFieldDefinition(
    field: GraphQLField<any, any>,
    details: {
      objectType: GraphQLObjectType | GraphQLInterfaceType;
    }
  ) {
    this.wrapType(field);
  }

  // Replace field.type with a custom GraphQLScalarType that enforces the
  // length restriction.
  wrapType(field: GraphQLField<any, any> | GraphQLInputField) {
    if (
      field.type instanceof GraphQLNonNull &&
      field.type.ofType instanceof GraphQLScalarType
    ) {
      field.type = new GraphQLNonNull(
        new LimitedLengthScalarType(field.type.ofType, this.args.max)
      );
    } else if (field.type instanceof GraphQLScalarType) {
      field.type = new LimitedLengthScalarType(field.type, this.args.max);
    } else {
      throw new Error(`Not a scalar type: ${field.type}`);
    }
  }
}
