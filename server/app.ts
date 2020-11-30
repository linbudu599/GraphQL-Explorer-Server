import 'reflect-metadata';
import Koa from 'koa';
import dotenv from 'dotenv';

import initialize from './utils/init';
import { log } from './utils/helper';

import cors from './middleware/cors';

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
