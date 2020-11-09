import chalk from "chalk";

export function log(msg: string, color: string = "green"): void {
  console.log(chalk[color](msg));
}

// FIXME:
export * from "./mock";
