import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLField,
  GraphQLArgument,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLInputField,
  GraphQLScalarType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLEnumValue,
} from "graphql";
import { SchemaDirectiveVisitor } from "graphql-tools";

export class SomeDirective extends SchemaDirectiveVisitor {
  // visitSchema(schema: GraphQLSchema) {}
  // visitObject(object: GraphQLObjectType) {}
  // visitFieldDefinition(field: GraphQLField<any, any>) {}
  // visitArgumentDefinition(argument: GraphQLArgument) {}
  // visitInterface(iface: GraphQLInterfaceType) {}
  // visitInputObject(object: GraphQLInputObjectType) {}
  // visitInputFieldDefinition(field: GraphQLInputField) {}
  // visitScalar(scalar: GraphQLScalarType) {}
  // visitUnion(union: GraphQLUnionType) {}
  // visitEnum(type: GraphQLEnumType) {}
  // visitEnumValue(value: GraphQLEnumValue) {}

  visitObject(object) {
    this._deprecate(object);
  }

  visitFieldDefinition(field) {
    this._deprecate(field);
  }

  visitEnumValue(value) {
    this._deprecate(value);
  }

  _deprecate(thing) {
    // Add some metadata to the object that the GraphQL server
    // can use later to display deprecation warnings.
    thing.isDeprecated = true;
    thing.deprecationReason = this.args.reason;
  }
}
