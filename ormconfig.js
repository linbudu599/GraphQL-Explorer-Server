const chalk = require("chalk");

const IS_DEV = process.env.NODE_ENV === "development";

console.log(`
${chalk.green(`[TypeORM] Config Env `)} ${chalk.cyan(
  IS_DEV ? "-DEV-" : "-PROD-"
)}
`);

module.exports = {
  type: "sqlite",
  name: "default",
  database: "info.db",
  synchronize: IS_DEV,
  dropSchema: IS_DEV,
  logging: "all",
  maxQueryExecutionTime: 1000,
  logger: "advanced-console",
  entities: [IS_DEV ? "server/entity/*.ts" : "server-dist/entity/*.js"],
  factories: ["server/entity/factories/*.ts"],
  seeds: ["server/entity/seeds/*.ts"],
  cache: {
    duration: 3000,
  },
};
