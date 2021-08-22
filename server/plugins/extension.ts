import { GraphQLRequestContext } from "apollo-server-plugin-base";
import { PluginDefinition } from "apollo-server-core";

import { IContext } from "../typing";

const ExtensionPlugin = (): PluginDefinition => ({
  requestDidStart: async () => ({
    async willSendResponse(
      reqContext: GraphQLRequestContext<Partial<IContext>>
    ) {
      reqContext.response!.extensions = {
        ...reqContext.response!.extensions,
        FROM_PLUGIN_WILL_SEND_RESPONSE: "FROM_PLUGIN_WILL_SEND_RESPONSE",
      };
    },
  }),
});

export default ExtensionPlugin;
