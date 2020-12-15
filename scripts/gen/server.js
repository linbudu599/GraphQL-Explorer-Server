const { spawn } = require("child_process");
const { infoData } = require("../utils");

infoData(`Fork Server Process PID: ${process.pid}`);
infoData(`Fork Server Process Args: ${process.argv[2]}\n`);

infoData("Start Server...");
const server = spawn("npm", ["run", "dev"]);

server.stdout.on("data", (data) => {
  process.send(data.toString());
});
