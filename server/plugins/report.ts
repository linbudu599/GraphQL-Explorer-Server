import {
  ApolloServerPluginUsageReporting,
  ApolloServerPluginSchemaReporting,
} from "apollo-server-core";

// APISchema
export const schemaPlugin = () =>
  process.env.APOLLO_KEY ? ApolloServerPluginSchemaReporting() : {};

// API各operation与field的使用状况
export const usagePlugin = () =>
  process.env.APOLLO_KEY
    ? ApolloServerPluginUsageReporting({
        sendVariableValues: { all: true },
        sendHeaders: { all: true },
        sendReportsImmediately: true,
      })
    : {};
