//files and apps needed to run
var create = require("./create.js");
var request = require("./request.js");
const renderer = require("./renderer");

const url = "http://shirts4mike.com";

//create .data directory. if the folder exsists, then it doesnt run.
create.folder();

//runs the request.js app, then takes the content in the form of an array...
//then passes that array to the renderer.js app.
//has a catch to collect error message

request.getShirtContent(url)
    .then((response) => {
        renderer.makeCSVwith(response);
    })
    .catch((err) => {
    console.log(err.message);
});


