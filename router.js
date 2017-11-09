//2.handle http route GET / and Post ? i.e. Home
var Profile = require("./profile.js");
var renderer = require('./renderer.js');
var queryString = require('querystring');
var commonHeaders = {'content-type': 'text/html'}; 

function home(req, res) {
  if(req.url === "/") {
    if (req.method.toLowerCase() === "get") {
      res.writeHead(200, commonHeaders);
      renderer.view("header", {}, res);
      renderer.view("search", {}, res);
      renderer.view("footer", {}, res);
      res.end();
      
      //if url == "/" && POST
        //redirect to /:username
    } else {
      req.on("data", function(postBody) {
        var query = queryString.parse(postBody.toString('utf8'));
        res.writeHead(303, {"Location": "/" + query.username});
        res.end();
      });
      
    }
  }
}

//3.handle the http route for GET /:username i.e. /chalkers
function user(req, res) {
  var username = req.url.replace("/", "");
  if(username.length > 0) {
    res.writeHead(200, commonHeaders);
    renderer.view("header", {}, res);
    
    var studentProfile = new Profile(username);
    
    studentProfile.on("end", function(profileJSON){
      //showprofile
      
      //store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //simple response
      renderer.view("profile", values, res);
      renderer.view("footer", {}, res);
      res.end();
      
    });
    
    studentProfile.on("error", function(error){
      
      renderer.view("error", {errorMessage: error.message}, res);
      renderer.view("search", {}, res);
      renderer.view("footer", {}, res);
      res.end();
    });    
  }
}

module.exports.home = home;
module.exports.user = user;










