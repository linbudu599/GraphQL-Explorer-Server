import { GraphQLRequestContext } from "apollo-server-plugin-base";

import { IContext } from "../typding";

const extensionPlugin = () => ({
  requestDidStart: () => ({
    willSendResponse(reqContext: GraphQLRequestContext<Partial<IContext>>) {
      reqContext.response!.extensions = {
        ...reqContext.response!.extensions,
        FROM_PLUGIN_WILL_SEND_RESPONSE: "FROM_PLUGIN_WILL_SEND_RESPONSE",
      };
    },
  }),
});

export default extensionPlugin;
