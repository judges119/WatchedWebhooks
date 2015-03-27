//Start the server with node server.js http://githubnewsfeedrsssurl.com
var newsFeed = require('./lib/newsfeed');
var express = require('express');
var load = require('express-load');
var app = express();
app.settings = require('./settings');
app.feedstate = {};
app.rules = [];

load('settings.js', { verbose: true })
  .then('config')
  .then('models')
  .then('controllers')
  .then('routes')
  .into(app, function(err, instance) {
    app.listen(3000);
    //Make an initial request to seed the news feed state used by the application
    seedFromRSS();
    //Every 10 minutes, make another request to the RSS feed to determine if there has been an update
    setInterval(function() {
      requestRSS();
    }, 1000 * 60 * 10);
  });

function seedFromRSS() {
  newsFeed(process.argv[2], function(err, out){
    //Only set it if the app.feedstate object is empty
    (Object.keys(app.feedstate).length === 0) && app.feedstate = sortEntries(out);
  });
}

function requestRSS() {
  newsFeed(process.argv[2], function(err, out){
    out = sortEntries(out);
    if (Date.parse(app.feedstate.updated[0]) != Date.parse(out.updated[0]) {
      var matches = matchingRules(newItems(app.feedstate, out));
      app.feedstate = out;
    }
  });
}

function newItems(initial, new) {
  return new.entry.reduce(function(p, c, i, a) {
    return (c.id[0].indexOf(initial.entry[0].id[0]) == -1) ? p.concat(c) : p;
  }, []);
}

function sortEntries(feed) {
  feed.entry.sort(function(a, b) {
    return (a.updated[0] < b.updated[0]) ? -1 : (a.updated[0] == b.updated[0]) ? 0 : 1;
  });
  return feed;
}

function matchingRules(new) {
  
}