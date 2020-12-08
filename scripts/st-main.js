const { fork } = require("child_process");
const os = require("os");
const path = require("path");

const cpuNums = os.cpus().length;

const PATH = path.resolve(__dirname, "./st-fork.js");

const { time } = require("minimist")(process.argv.slice(2));

for (let i = 0; i < cpuNums; i++) {
  const child = fork(PATH, [i]);
  child.send(`Msg send to child${i}`);
  child.on("message", (data) => {
    console.log(`msg from child${i}: ${data.toString()}`);
  });

  setTimeout(() => {
    child.kill();
  }, time ?? 1000);
}
