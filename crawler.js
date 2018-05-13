var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var json = require('json');

var obj = require('./test1.json');

// var fs = require("fs");
// var test = fs.readFileSync('test1.json');
// // var test = fs.readFileSync(process.argv[2]);
// var jsonData = JSON.parse(test);


var START_URL = obj.pages[0].address;

var pagesVisited = {}; // create a set
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(START_URL);

var duplicate = [];
var invalid = [];

console.log(obj.pages);

pagesToVisit.push(START_URL);
crawl();

function crawl() {
    var nextPage = pagesToVisit.pop();
    console.log(nextPage);

      if (nextPage in pagesVisited) {
        // We've already visited this page, so push to duplicate array and repeat the crawl
        duplicate.push(nextPage);
        crawl();
      } else if(!nextPage.hasOwnProperty("address")) {
        invalid.push(nextPage);
      } else {
        // New page we haven't visited
        visitPage(nextPage, crawl);
      }
}

function visitPage(url, callback) {
  // Add page to our set
  pagesVisited[url] = true;
  numPagesVisited++;
      collectLinks();
      // This callback is just calling crawl()
      callback();
}

function collectLinks() {
         var links = obj.pages[0].links;
         for(var link in links);
         console.log(links);
        //  console.log(link);
        //  var link = obj.pages[0].links[0];
        //   console.log(link);
        //  if(link in pagesVisited) {
        //   duplicate.push(link);
        //  } else if(link !== obj.pages[0].address) {
        //   invalid.push(link);
        //  } else {
           pagesToVisit.push(link[0]);
           crawl();
        //  }
}
console.log("Success: ", pagesVisited);
console.log("Skipped: ", duplicate);
console.log("Error: ", invalid);