#!/usr/bin/env node

const { fork, execSync } = require("child_process");
const path = require("path");
const { infoData, logData } = require("../utils");

const { docs = false, code = false } = require("minimist")(
  process.argv.slice(2)
);

const SERVER = path.resolve(__dirname, "./server.js");
const DOCS = path.resolve(__dirname, "./docs.js");
const CODES = path.resolve(__dirname, "./code.js");
const KILL_PORT_BASH = path.resolve(__dirname, "../../kill-port.sh");

try {
  const killPort = execSync(`bash ${KILL_PORT_BASH} 4000`);
  infoData(killPort);
} catch (error) {
  console.log("eee");
}

let docsTaskFinished = !docs;
let codeTaskFinished = !code;

const serverProcess = fork(SERVER, ["Server Process"]);

if (docs) {
  genDocs();
}

if (code) {
  genCode();
}

function genDocs() {
  const docsGenProcess = fork(DOCS, ["Docs Generator Process"]);

  serverProcess.on("message", (data) => {
    // infoData(`Message From Server Process: ${data.toString()}`);
    if (data.toString().includes("Server ready")) {
      docsGenProcess.send("Gotcha!");
    }
  });

  docsGenProcess.on("message", (data) => {
    docsTaskFinished = false;
    infoData(`Message From Docs Process: ${data.toString()}`);
    if (data.toString() === "DONE") {
      docsTaskFinished = true;
    }
  });
}

function genCode() {
  const codeGenProcess = fork(CODES, ["Code Generator Process"]);

  serverProcess.on("message", (data) => {
    // infoData(`Message From Server Process: ${data.toString()}`);
    if (data.toString().includes("Server ready")) {
      codeGenProcess.send("Gotcha!");
    }
  });

  codeGenProcess.on("message", (data) => {
    codeTaskFinished = false;
    infoData(`Message From Code Process: ${data.toString()}`);
    if (data.toString() === "DONE") {
      codeTaskFinished = true;
    }
  });
}

setInterval(() => {
  logData("=== Check Task Status ===");
  console.log(`Docs: ${docsTaskFinished}`);
  console.log(`Code: ${codeTaskFinished}`);

  if (docsTaskFinished && codeTaskFinished) {
    infoData(`Task Finished`);
    process.exit(0);
  }
}, 1000);
