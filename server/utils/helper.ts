import chalk from "chalk";
import {
  GraphQLResolveInfo,
  GraphQLFieldConfig,
  GraphQLObjectTypeConfig,
} from "graphql";

export function log(msg: string, color: string = "green"): void {
  console.log(chalk[color](msg));
}

export const extractParentTypeConfig = (
  info: GraphQLResolveInfo
): GraphQLObjectTypeConfig<any, any> => info.parentType.toConfig();

export const extractFieldConfig = (
  info: GraphQLResolveInfo
): GraphQLFieldConfig<any, any> => {
  const {
    type,
    extensions,
    description,
    deprecationReason,
  } = info.parentType.getFields()[info.fieldName];

  return {
    type,
    description,
    extensions,
    deprecationReason,
  };
};

export const extractLoggerExtensionsFromConfig = (
  config: GraphQLObjectTypeConfig<any, any> | GraphQLFieldConfig<any, any>
) => (config.extensions && config.extensions.log) ?? { log: undefined };

export const getLoggerExtensions = (info: GraphQLResolveInfo) => {
  const fieldConfig = extractFieldConfig(info);
  const fieldLoggerExtensions = extractLoggerExtensionsFromConfig(fieldConfig);

  const parentConfig = extractParentTypeConfig(info);
  const parentLoggerExtensions = extractLoggerExtensionsFromConfig(
    parentConfig
  );

  return {
    ...parentLoggerExtensions,
    ...fieldLoggerExtensions,
  };
};

interface ITaskRelationOptions {
  joinAssignee?: boolean;
  joinSubstance?: boolean;
}

export const getTaskRelations = ({
  joinAssignee = false,
  joinSubstance = false,
}: ITaskRelationOptions): string[] => {
  const relations: string[] = [];
  joinAssignee ? relations.push("assignee") : void 0;
  joinSubstance ? relations.push("taskSubstance") : void 0;
  return relations;
};
