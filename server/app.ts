import "reflect-metadata";
import Koa from "koa";

import cors from "./middleware/cors";
import { log } from "./utils/helper";

import initialize from "./server";

async function bootstrap() {
  const app = new Koa();

  app.use(cors);

  const server = await initialize();

  const httpServer = app.listen(4000, () => {
    log(`[Apollo Server] Server ready at http://localhost:4000/graphql`);
  });

  server.applyMiddleware({ app });

  server.installSubscriptionHandlers(httpServer);
}

log(`=== [GraphQL Explorer] Bootstrapping ===`);
bootstrap();
