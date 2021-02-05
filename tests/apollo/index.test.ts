import { gql } from "apollo-server-koa";
import { createTestClient } from "apollo-server-testing";
import createServer from "../../server/server";

const CONTAINER_REGISTER_TIME = gql`
  query {
    ContainerRegisterTime
  }
`;

const EXTENSION = {
  FROM_RESPONSE_FORMATTER: "FROM_RESPONSE_FORMATTER",
  FROM_CUSTOM_EXTENSION: "[Deprecated] FROM_CUSTOM_EXTENSION",
  FROM_PLUGIN_WILL_SEND_RESPONSE: "FROM_PLUGIN_WILL_SEND_RESPONSE",
};

describe.only("Apollo Server Integration Test", () => {
  it("fetch container register time with correct extensions", async () => {
    const server = await createServer();
    const { query } = createTestClient(server);

    const res = await query({ query: CONTAINER_REGISTER_TIME });
    console.log(res);
    expect(typeof res.data.ContainerRegisterTime).toBe("number");
    expect(res.data.ContainerRegisterTime.toString().length).toBe(13);
  });
});
