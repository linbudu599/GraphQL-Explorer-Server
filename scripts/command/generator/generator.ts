import fs from "fs";
import path from "path";

import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";

import { isValidEntityName, pascalize } from "../utils";

const spinner = ora();

enum ResourceType {
  RESOLVER = "resolver",
  TYPE = "type",
  Entity = "entity",
}

const getTemplatePath = (resourceType: ResourceType): string =>
  path.join(__dirname, `../generator/templates/_${resourceType}.ts`);

const getDestPath = (
  resourceType: ResourceType,
  entityName: string
): string => {
  const folderName =
    resourceType === ResourceType.RESOLVER
      ? "resolvers"
      : resourceType === ResourceType.TYPE
      ? "graphql"
      : "entities";

  const fileName =
    resourceType === ResourceType.RESOLVER ? ".resolver.ts" : ".ts";

  return path.join(
    __dirname,
    `../../../server/${folderName}`,
    `${entityName}${fileName}`
  );
};

interface IGenPromptRes {
  resourceType: ResourceType[];
  entityName: string;
}

// TODO: support [should format entity name] prompt
export const resourceGenerator = () => {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "resourceType",
        message: "Choose Resource Type To Generate: ",
        choices: ["resolver", "type", "entity"],
        default: "resolver",
      },
      {
        type: "input",
        name: "entityName",
        message: "Input Entity Name: ",
      },
    ])
    .then(({ resourceType, entityName }: IGenPromptRes) => {
      if (!resourceType.length) {
        spinner.fail(
          chalk.redBright("You need to choose at least 1 resource type!")
        );
        process.exit(0);
      }

      if (!entityName || !isValidEntityName(entityName)) {
        spinner.fail(chalk.redBright("You need to input valid entity name!"));
        process.exit(0);
      }

      const pascalizeEntityName = pascalize(entityName);

      for (const resrcType of resourceType) {
        const content = fs
          .readFileSync(getTemplatePath(resrcType), { encoding: "utf-8" })
          .replaceAll("__ENTITY_NAME__", pascalizeEntityName)
          .replaceAll(
            "__LOWERCASE_ENTITY_NAME__",
            entityName.toLocaleLowerCase()
          )
          .replaceAll("// @ts-nocheck", "");

        const destPath = getDestPath(resrcType, pascalizeEntityName);

        fs.writeFileSync(destPath, content, {
          encoding: "utf-8",
          flag: "as+",
        });

        spinner.succeed(`Generated to ${destPath}`);
      }
    });
};

//  try {
//    const content = fs
//      .readFileSync(getTemplatePath(resourceType), { encoding: "utf-8" })
//      .replaceAll("__ENTITY_NAME__", pascalizeEntityName)
//      .replaceAll(
//        "__LOWERCASE_ENTITY_NAME__",
//        pascalizeEntityName.toLocaleLowerCase()
//      )
//      .replaceAll("// @ts-nocheck", "");

//    fs.writeFileSync(getDestPath(resourceType, pascalizeEntityName), content, {
//      encoding: "utf-8",
//      flag: "as+",
//    });
//    spinner.succeed(
//      `Generated to ${getDestPath(resourceType, pascalizeEntityName)}`
//    );
//  } catch (error) {
//    console.error(error);
//  }
