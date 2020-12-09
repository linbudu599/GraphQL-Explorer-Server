const { spawn } = require("child_process");
const { logData, infoData } = require("../utils");

logData(`=== Fork Docs Gen Process PID: ${process.pid} ===`);
logData(`=== Fork Docs Gen Process Args: ${process.argv[2]}\n ===`);

process.on("message", (data) => {
  infoData("Start Spawning Docs Gen Process...");
  const docsGenProcess = spawn("npm", ["run", "gen:docs"]);

  docsGenProcess.stdout.on("data", (data) => {
    infoData("Docs Gen Info:");
    infoData(data);
    process.send(data.toString());
  });

  docsGenProcess.on("close", (code) => {
    process.send("DONE");
    infoData(`=== Docs Gen Process Exit With Code: ${code} ===`);
  });
});
