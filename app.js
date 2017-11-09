//Problem: need simple way to look at user's badge count and js points from web browser
//Solution: use node.js to perform the profile lookups and serve our templates via HTTP

var router = require("./router.js");

const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  router.home(req, res);
  router.user(req, res);
  //res.end('Hello World\n');
});

server.listen(port, () => {
  console.log(`Server running at http://workspaceurl:${port}/`);
});





//function that handles the reading of files and merge in value
    //read from file and get a string
      //merge values in to string

