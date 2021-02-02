import { GraphQLRequestContext } from "apollo-server-plugin-base";
import { ContainerInstance, Container } from "typedi";

import { IContext } from "../typing";

const scopedContainerPlugin = (Container) => ({
  requestDidStart: () => ({
    willSendResponse(reqContext: GraphQLRequestContext<Partial<IContext>>) {
      Container.reset(reqContext.context.currentUser!.accountId);
      const instancesIds = ((Container as any)
        .instances as ContainerInstance[]).map((instance) => instance.id);
      console.log("instances left in memory:", instancesIds);
    },
  }),
});

export default scopedContainerPlugin;
