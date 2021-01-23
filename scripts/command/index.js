const chalk = require("chalk");

const resourceGenerator = require("./generator/generator");

const { _: args, t, type } = require("minimist")(process.argv.slice(2));

const generateType = t || type;

const [command] = args;

const entityName = process.env.ENTITY_NAME;

switch (command) {
  case "gen":
    resourceGenerator(entityName, generateType);
    break;
  case "generate":
    resourceGenerator(entityName, generateType);
    break;
  default:
    console.log(chalk.yellowBright("WIP"));
}
