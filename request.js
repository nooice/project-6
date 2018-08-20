const cheerio = require("cheerio");
const scrapeIt = require("scrape-it");

//I chose scrapeIt to scrape the data from the website and cheerio to convert the data into easy to use jquery.
//scrapeIt is very simple and worked great. i tried using request and request-promise but...
//those 2 didnt work with async functions. I wasnt able to pause my functions to wait...
//for the data from the website to come back. scrapeIt allowed me to store it easily into a variable

//allows the other functions to use the supplied url
let url;

//goes to first url and scrapes website to find the shirts page link.
//then creates the new link and sends it to the findShirtsFrom function
//awaits for final array full of content then sends it back to..
//the scraper.js initial call
const getShirtContent = async (urlPath) => {
    url = urlPath;
    let response = await scrapeIt(urlPath);
    let $ = cheerio.load(response.body);
    let shirtsPage = urlPath + "/" + $(".shirts a").attr("href");
    let csvContent = await findShirtsFrom(shirtsPage);
    return csvContent;
};

//takes the new url and scrapes the website.
//sends the html to getShirtsInfo function 
//then awaits the reply to pass back to getshirtContent function
//i probably could have combined this function with getShirtInfo but...
//i wanted to only do one scrape per function.
//so this is just the middle man to get to the individual shirt pages
const findShirtsFrom = async (urlPath) => {
    let response = await scrapeIt(urlPath);
    let $ = cheerio.load(response.body);
    let arrayOfShirtInfo = await getShirtInfo($);
    return arrayOfShirtInfo;
};

//takes the html provided and pulls the URL links to each shirt
//i compile all the links into an array because i couldnt run the scrape inside...
//the .each function. but i can run the for loop of each arrayLinks and...
//run await scrapIt inside the loop. then after the scrape the info is stored...
//into the shirtArray temporarily, then once all the data for that shirt is collected...
//it pushes it into the finalShirtArray preloaded with the header details for the csv file.
//the finalShirtArray is sent back to findShirtsFrom() then to getShirtContent back the scraper.js
const getShirtInfo = async (pageData) => {
    let $ = pageData;
    let shirtLinks = [];
    let finalShirtArray = [['Title','Price','ImageURL','URL','Time']];
    $(".products li a").each(function(){
        let shirtURL = url + "/" + $(this).attr("href");
        shirtLinks.push(shirtURL);
    });
    for (let item of shirtLinks){
        let response = await scrapeIt(item);
        let $ = cheerio.load(response.body);
        let shirtArray = [];
        let price = $(".price").text();
        let shirtTitle = $(".shirt-picture img").attr("alt");
        let imgURL = url + "/" + $(".shirt-picture img").attr("src");
        let d = new Date();
        let dHour = ("0" + d.getHours()).slice(-2).toString();
        let dMin = ("0" + d.getMinutes()).slice(-2).toString();
        let dSec = ("0" + d.getSeconds()).slice(-2).toString();
        let scrapeTime = dHour + ':' + dMin + ':' + dSec;
        shirtArray.push(shirtTitle, price, imgURL, item, scrapeTime);
        finalShirtArray.push(shirtArray);
    };
    return finalShirtArray;
};

module.exports.getShirtContent = getShirtContent;