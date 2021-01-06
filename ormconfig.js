const chalk = require("chalk");

const IS_DEV =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

const IS_TEST = process.env.NODE_ENV === "test";

console.log(`
${chalk.green(`[TypeORM] Config Env `)} ${chalk.cyan(
  IS_DEV ? "-DEV-" : "-PROD-"
)}
`);

module.exports = {
  type: "sqlite",
  name: "default",
  database: IS_DEV ? "db.sqlite" : "db-prod.sqlite",
  // synchronize: IS_DEV,
  synchronize: true,
  dropSchema: IS_DEV,
  logging: IS_TEST ? false : "all",
  maxQueryExecutionTime: 1000,
  logger: "advanced-console",
  entities: [IS_DEV ? "server/entity/*.ts" : "dist/entity/*.js"],
  factories: ["server/entity/factories/*.ts"],
  seeds: ["server/entity/seeds/*.ts"],
  cache: {
    duration: 3000,
  },
};
