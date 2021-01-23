const fs = require("fs");
const path = require("path");

const chalk = require("chalk");

const supportResourceType = ["resolver", "type", "entity"];

// TODO: choose resource type by inquirer 单选/多选
const getTemplatePath = (resourceType) =>
  path.join(__dirname, `../generator/templates/_${resourceType}.ts`);

const getDestPath = (resourceType, entityName) => {
  const folderName =
    resourceType === "resolver"
      ? "resolvers"
      : resourceType === "type"
      ? "graphql"
      : "entities";

  const fileName = resourceType === "resolver" ? ".resolver.ts" : ".ts";

  return path.join(
    __dirname,
    `../../../server/${folderName}`,
    `${entityName}${fileName}`
  );
};

const resourceGenerator = (entityName, resourceType) => {
  if (!supportResourceType.includes(resourceType)) {
    console.log(chalk.redBright("UNSUPPORTED RESOURCE TYPE"));
    return process.exit(0);
  }

  try {
    const content = fs
      .readFileSync(getTemplatePath(resourceType), { encoding: "utf-8" })
      .replaceAll("__ENTITY_NAME__", entityName)
      .replaceAll("__LOWERCASE_ENTITY_NAME__", entityName.toLocaleLowerCase())
      .replaceAll("// @ts-nocheck", "");

    fs.writeFileSync(getDestPath(resourceType, entityName), content, {
      encoding: "utf-8",
      flag: "as+",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = resourceGenerator;
