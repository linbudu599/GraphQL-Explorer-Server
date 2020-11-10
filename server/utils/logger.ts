import { Service } from "typedi";
import { log as tmpLogger } from "./";

@Service()
export class Logger {
  log(args: string) {
    tmpLogger("");
    tmpLogger("=== Logger Start ===\n");

    tmpLogger(args + "\n");

    tmpLogger("=== Logger End ===\n");
  }
}
