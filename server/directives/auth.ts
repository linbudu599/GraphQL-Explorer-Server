import { defaultFieldResolver, GraphQLField, GraphQLObjectType } from "graphql";
import { SchemaDirectiveVisitor } from "graphql-tools";

export const enum AuthDirectiveRoleEnum {
  ADMIN,
  REVIEWER,
  USER,
  UNKNOWN,
}

type AuthEnumMembers = keyof typeof AuthDirectiveRoleEnum;

type AuthGraphQLObjectType = GraphQLObjectType & {
  _requiredAuthRole: AuthEnumMembers;
  _authFieldsWrapped: boolean;
};

type AuthGraphQLField<T, K> = GraphQLField<T, K> & {
  _requiredAuthRole: AuthEnumMembers;
};

const getUser = async (token: string): Promise<AuthEnumMembers[]> => {
  return ["USER"];
};

export class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type: AuthGraphQLObjectType) {
    console.log(`@auth invoked at visitObject ${type.name}`);
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }

  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  // 字段/参数级别的指令同样能够访问其父级类型
  visitFieldDefinition(
    field: AuthGraphQLField<any, any>,
    details: {
      objectType: AuthGraphQLObjectType;
    }
  ) {
    console.log(`@auth invoked at visitFieldDefinition ${field.name}`);

    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType: AuthGraphQLObjectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    // 在对象类型上新增_authFieldsWrapped, 避免重复标识
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    // 指令触发的对象类型本次查询中携带的字段
    const fields = (objectType.getFields() as unknown) as AuthGraphQLField<
      any,
      any
    >[];

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName] as AuthGraphQLField<any, any>;
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async (...args) => {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        // 字段级别的优先 如果没有才去查对象类型上的(细粒度鉴权)
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;

        console.log("requiredRole: ", requiredRole);

        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        const context = args[2];
        const userRoles = await getUser(context?.headers?.authToken ?? "");

        if (!userRoles.includes(requiredRole)) {
          throw new Error("not authorized");
        }

        return resolve.apply(this, args);
      };
    });
  }
}
