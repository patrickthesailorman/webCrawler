var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var json = require('json');

var fs = require("fs");
var test = fs.readFileSync('test1.json');
// var test = fs.readFileSync(process.argv[2]);
var jsonData = JSON.parse(test);

var START_URL = jsonData.pages[0].address;

var pagesVisited = {}; // create a set
var pagesToVisit = [];
var url = new URL(START_URL);

var duplicate = [];
var invalid = [];


pagesToVisit.push(START_URL);
crawl();

function crawl() {
    var nextPage = pagesToVisit.pop();
    console.log(nextPage);

      if (nextPage in pagesVisited) {
        // We've already visited this page, so push to duplicate array and repeat the crawl
        duplicate.push(nextpage);
        console.log("Skipped");
        crawl();
      } else {
        // New page we haven't visited
        visitPage(nextPage, crawl);
      }
}

function visitPage(url, callback) {
  // Add page to our set
  pagesVisited[url] = true;
  pagesVisited++;

  // Make the request
  console.log("Success: " + url);
      collectLinks();

      // This callback is just calling crawl()
      callback();
}

function collectLinks() {
    var links = jsonData.pages[0].links;
     for(var i = 0; i < links.length; i++) {
       if(links[i] in pagesVisited) {
         duplicate.push(links[i]);
       } else if(!links[i] in jsonData.pages) {
         invalid.push(links[i]);
       }
     }
        pagesToVisit.push(links);
        // console.log(links);
}
console.log("Skipped: ", duplicate);
console.log("Error: ", invalid);