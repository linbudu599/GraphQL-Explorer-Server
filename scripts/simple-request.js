const sa = require("superagent");
const chalk = require("chalk");

console.log(chalk.green("=== Server Test Request Start ==="));

const query = `
    query {
      Users(pagination: { cursor: 0, offset: 12 }) {
        data {
          uid
          tasks {
            taskId
            taskTitle
          }
        }
      }
    }
  `;

sa.post("http://localhost:4000/graphql")
  .send({
    operationName: null,
    query,
    variables: {},
  })
  .set("accept", "json")
  .end((err, res) => {
    if (err) {
      console.log(chalk.red("=== Error Occured ==="));
      console.error(err);
    }
    console.log(chalk.green("=== RESPONSE START ==="));
    console.log(res.body.data.Users);
    console.log(chalk.green("=== RESPONSE END ==="));
    console.log(chalk.green("=== Server Test Request End ==="));
  });

exports.query = query;
