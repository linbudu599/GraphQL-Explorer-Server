import "reflect-metadata";
import dotenv from "dotenv";
import initialize from "./utils/init";
import { log } from "./utils";

const dev = process.env.NODE_ENV === "dev";

dotenv.config({ path: dev ? ".env.dev" : ".env.prod" });

async function start() {
  const server = await initialize();
  server.listen().then(({ url }) => {
    log(`Server ready at ${url}`);
  });
}

start();
