const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const { server = false, client = false, vercel = false } = require("minimist")(
  process.argv.slice(2)
);

const SERVER_DIST = path.join(__dirname, "../server-dist");
const CLIENT_DIST = path.join(__dirname, "../client-dist");
const VERCEL_DIST = path.join(__dirname, "../api-dist");

try {
  if (fs.existsSync(SERVER_DIST) && server) {
    fs.rmdirSync(SERVER_DIST, {
      recursive: true,
    });
    console.log(chalk.green("Server Dist Removed"));
  }

  if (fs.existsSync(CLIENT_DIST) && client) {
    fs.rmdirSync(CLIENT_DIST, {
      recursive: true,
    });
    console.log(chalk.green("Client Dist Removed"));
  }

  if (fs.existsSync(VERCEL_DIST) && vercel) {
    fs.rmdirSync(VERCEL_DIST, {
      recursive: true,
    });
    console.log(chalk.green("Vercel Dist Removed"));
  }
} catch (error) {
  console.error(error);
}
