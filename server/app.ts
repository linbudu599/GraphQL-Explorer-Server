import "reflect-metadata";
import Koa from "koa";
import dotenv from "dotenv";

import initialize from "./utils/init";
import { log } from "./utils/helper";

import cors from "./middleware/cors";

const dev = process.env.NODE_ENV === "development";

dotenv.config({ path: dev ? ".env.dev" : ".env.prod" });

log(`[Env] Loading ${dev ? "DEV" : "PROD"} File`);

async function bootstrap() {
  const app = new Koa();
  app.use(cors);

  const server = await initialize();
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    log(
      `[Apollo Server] Server ready at http://localhost:${4000}${
        server.graphqlPath
      }`
    )
  );
}

bootstrap();
