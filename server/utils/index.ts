import chalk from "chalk";

export function log(msg: string, color = "green"): void {
  // @ts-ignore
  console.log(chalk[color](msg));
}

export * from "./mock";
