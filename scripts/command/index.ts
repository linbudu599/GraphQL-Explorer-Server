import chalk from "chalk";

import { resourceGenerator } from "./generator/generator";

const { _: args } = require("minimist")(process.argv.slice(2));

const [command] = args;

switch (command) {
  case "gen":
    resourceGenerator();
    break;
  case "generate":
    resourceGenerator();
    break;
  default:
    console.log(chalk.yellowBright("WIP"));
}
