const path = require("path");

const fs = require("fs-extra");
const chalk = require("chalk");

// fs.copyFile("./src/");
console.log(path.join(__dirname, "../../server/prisma/client"));
const clientSrc = path.join(__dirname, "../../server/prisma/client");
const clientDest = path.join(__dirname, "../../dist/prisma/client");

const schemaSrc = path.join(__dirname, "../../server/prisma/schema.prisma");
const schemaDest = path.join(__dirname, "../../dist/prisma/schema.prisma");

fs.copy(clientSrc, clientDest, () => {
  console.log(chalk.greenBright("Prisma Client Copied"));
});

fs.copy(schemaSrc, schemaDest, () => {
  console.log(chalk.greenBright("Prisma Schema Copied"));
});
