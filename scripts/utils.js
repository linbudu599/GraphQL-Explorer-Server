const net = require("net");
const chalk = require("chalk");

async function isPortInService(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer().listen(port);

    server.on("listening", () => {
      server.close();
      console.log(`${port} not in use`);
      resolve(false);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`${port} in server`);
        resolve(true);
      }
    });
  });
}

function logData(msg) {
  console.log(chalk.green(msg));
}

function infoData(msg) {
  console.log(chalk.cyan(msg));
}

exports.isPortInService = isPortInService;

exports.logData = logData;

exports.infoData = infoData;
