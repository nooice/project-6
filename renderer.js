var csv = require("fast-csv");
var create = require("./create");
var fs = require("fs");

//I chose to use fast-csv to write the data to csv. i found it easier to collect the data into an array
//fast-csv makes it easy to wrate array data to the csv. 
//it also has a few active contributors and is updated periodically

//function creates file based on todays date in the folder set up on the scraper.js file.
//then takes the data given from scraper.js and writes it to the csv file.

//this is the last function in the app so it logs "done" to the console to inform the user that it has finished
const makeCSVwith = async (content) => {
    let todaysDate = await create.todaysDate();
    create.csvWith(todaysDate);
    let dir = await create.dirLocation();
    let pathToCSV = dir + "/" + todaysDate + ".csv";
    let ws = await fs.createWriteStream(pathToCSV);
    csv.write(content, {headers: true}).pipe(ws);
    console.log("done");
};

module.exports.makeCSVwith = makeCSVwith;
