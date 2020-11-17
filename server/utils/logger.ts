import { Service } from "typedi";
import { log as tmpLogger } from "./helper";

@Service()
export class Logger {
  log(...args: any[]) {
    tmpLogger("");
    tmpLogger("=== Logger Start ===\n");

    console.log(...args);

    tmpLogger("=== Logger End ===\n");
  }
}
