import "reflect-metadata";
import Koa from "koa";
import dotenv from "dotenv";
import initialize from "./utils/init";
import cors from "./middleware/cors";
import { log } from "./utils";

const dev = process.env.NODE_ENV === "dev";

dotenv.config({ path: dev ? ".env.dev" : ".env.prod" });

async function bootstrap() {
  const app = new Koa();
  const server = await initialize();
  app.use(cors);

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
