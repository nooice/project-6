//scraper should create a folder called data, if a folder doesnt already exist.
var fs = require('fs');
var dir = './data';

//creates folder
function folder() {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}
//creates csv file with date supplied by todaysDate function
function csvWith(todaysDate) {
    var filePath = dir + "/" + todaysDate + ".csv";
    fs.writeFile(filePath, "", (err) =>{
        if (err) throw err;
    });
}
//captures and returns the date in the format -> 2018-08-19
function todaysDate() {
    var d = new Date();
    var dDay = ("0" + d.getDate()).slice(-2).toString();
    var dMonth = ("0" + (d.getMonth() + 1)).slice(-2).toString();
    var dYear = d.getFullYear().toString();
    var todaysDate = dYear + "-" + dMonth + "-" + dDay;
    return todaysDate;
}
//used to refer to the same folder in renderer.js that scraper.js uses
//in case folder destination changes
function dirLocation(){
    return dir;
}

module.exports.dirLocation = dirLocation;
module.exports.folder = folder;
module.exports.csvWith = csvWith;
module.exports.todaysDate = todaysDate;