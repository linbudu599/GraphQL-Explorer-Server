import { PrismaClient } from "./client";

const client = new PrismaClient();

(async () => {
  const createRes = await client.prismaDataSource.create({
    data: {
      title: "Prisma 2 Integration",
    },
  });
  console.log(createRes);
})();
