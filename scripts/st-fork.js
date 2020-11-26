const sa = require('superagent');
const { query } = require('./simple-request');

console.log(`Fork Child Process ${process.pid}`);
console.log(`Fork Child Idx: ${process.argv[2]}\n`);

process.on('message', (data) => {
  console.log(`${process.argv[2]} got msg: ${data.toString()}`);
});

process.send(`child ${process.argv[2]} send msg`);

let counter = 0;

setInterval(() => {
  sa.post('http://localhost:4000/graphql')
    .send({
      operationName: null,
      query,
      variables: {},
    })
    .set('accept', 'json')
    .end((err, res) => {
      counter++;
      console.log(res.body.data.Users);
      console.log(`${process.argv[2]}: ${counter}`);
    });
}, 300);
