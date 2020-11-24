const sa = require("superagent");

console.log(`Fork Child Process ${process.pid}`);
console.log(`Fork Child Idx: ${process.argv[2]}\n`);

process.on("message", (data) => {
  console.log(`${process.argv[2]} got msg: ${data.toString()}`);
});

process.send(`child ${process.argv[2]} send msg`);

let counter = 0;

setInterval(() => {
  sa.post("http://localhost:4000/graphql")
    .send({
      operationName: null,
      // query: "{ Users {    success    message    data {      uid    } }}",
      query: "{  Recipes {    title  }}",
      variables: {},
    })
    .set("accept", "json")
    .end((err, res) => {
      counter++;
      console.log(res.body.data.Recipes);
      // console.log(`Request Success: ${res.body.data.Users.success}`);
      console.log(`${process.argv[2]}: ${counter}`);
    });
}, 100);
