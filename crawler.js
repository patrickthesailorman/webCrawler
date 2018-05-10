var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var START_URL = "http://foo.bar.com";

var pagesVisited = {};
var pagesToVisit = [];
var url = new URL(START_URL);
var skipped = [];
var duplicate = [];
var invalid = [];


pagesToVisit.push(START_URL);
crawl();

function crawl() {
    var nextPage = pagesToVisit.pop();
      if (nextPage in pagesVisited) {
        // We've already visited this page, so push to duplicate and repeat the crawl
        duplicate.push(nextpage);
        crawl();
      } else {
        // New page we haven't visited
        visitPage(nextPage, crawl);
      }
}

