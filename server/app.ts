import "reflect-metadata";
import Koa from "koa";
import { graphqlUploadKoa } from "graphql-upload";
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
  app.use(
    graphqlUploadKoa({
      maxFileSize: 10 * 1024 * 1024,
      maxFiles: 20,
    })
  );
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    log(`Server ready at http://localhost:${4000}${server.graphqlPath}`)
  );
}

bootstrap();
