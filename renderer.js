//function that handles the reading of files and merge in value
    //read from file and get a string
      //merge values in to string

var fs = require("fs");

function mergeValues(values, content) {
  //cycle over the keys
  for(var key in values) {
    content = content.replace("{{" + key + "}}", values[key])
  }
    //replace all key with value from the values objet
  return content;
 //return merged content
}

function view(templateName, values, response) {
   var fileContents = fs.readFileSync('./views/' + templateName + ".html", {encoding: "utf8"});
    //insert values into content
  fileContents = mergeValues(values, fileContents);

//write out the contents to response  
  response.write(fileContents);  
}


module.exports.view = view;