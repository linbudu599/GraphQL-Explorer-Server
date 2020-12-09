const { spawn } = require("child_process");
const { logData, infoData } = require("../utils");

logData(`=== Fork Code Gen Process PID: ${process.pid} ===`);
logData(`=== Fork Code Gen Process Args: ${process.argv[2]}\n ===`);

process.on("message", (data) => {
  infoData("=== Start SpawninG Code Gen Process... ===");
  const codeGenProcess = spawn("npm", ["run", "gen:code"]);

  codeGenProcess.stdout.on("data", function (data) {
    infoData("Code Gen Info:");
    infoData(data);
    process.send(data.toString());
  });

  codeGenProcess.on("close", function (code) {
    process.send("DONE");
    infoData(`=== Code Gen Process Exit With Code: ${code} ===`);
  });
});
