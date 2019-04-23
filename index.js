// import server from './server/js'
const server = require("./server.js");

const port = 5000;

server.listen(port, () =>
  console.log(`\n server listening on port: ${port} \n`)
);

/*

1. install express with "yarn add express" or "npm i express"
2. run it with "yarn server"

*/
