var url = require('url');
var http = require('http');
var GitHubApi = require('github');
/*var auth = {
  type: "oauth",
  key: process.argv[2],
  secret: process.argv[3]
}*/
var app = {};
app.rules = require('./rules');
app.recent = [];
app.etag = undefined;

var github = new GitHubApi({
  version: "3.0.0",
  protocol: "https",
  headers: {
    "user-agent": "WatchedWebhooks" // GitHub is happy with a unique user agent
  }
});

//Make an initial request to seed the news feed state used by the application
requestAPI();
//Every 10 minutes, make another request to the RSS feed to determine if there has been an update
setInterval(function() {
  requestAPI();
}, 1000 * 60 * 10); //@TODO Make timescale configurable

/*
Makes a request to the GitHub API for events regarding the user provided as a command-line argument
Checks responses against rules and takes further action if necessary
*/
function requestAPI() {
  //github.authenticate(auth);
  github.events.getReceived({
    headers: (typeof app.etag === 'undefined') ? undefined : { "If-None-Match": app.etag },
    user: process.argv[2]
  }, function(err, json) {
    if (err || json.meta.status.indexOf('304 Not Modified') > -1) {
      return;
    }
    app.etag = json.meta.etag;
    delete json.meta;
    console.log(json);
    fireHooks(matchingRules(newItems(app.recent, json)));
    app.recent = json;
  });
}

/*
Checks the existing events against new ones from an API call, returning only new events
*/
function newItems(initial, newstuff) {
  return newstuff.reduce(function(p, c, i, a) {
    return (initial.length === 0 || c.id !== initial[0].id) ? p.concat(c) : p;
  }, []);
}

/*
Checks a set of events against known rules
Returns an array of objects, each object containing the event and any rules it triggers
*/
function matchingRules(newstuff) {
  return newstuff.reduce(function(previous, current, index, array) {
    return previous.concat({
      object: current,
      rules: app.rules.filter(function(e, i, a) {
        if (e.hasOwnProperty('repo')) {
          return (e.repo.indexOf(current.repo.name) > -1 && e.event.indexOf(current.type) > -1);
        } else {
          return (e.event.indexOf(current.type) > -1);
        }
      })
    });
  }, []);
}

/*
Given a set of objects, each containing an event an the rules it triggers, fire off a POST request with the event data to the hook specified by each rule
*/
function fireHooks(matches) {
  matches.forEach(function(match) {
    if (match.rules.length == 0) {
      return;
    }
    match.rules.forEach(function(e, i, a) {
      var options = url.parse(e.webhook);
      options.method = 'POST';
      options.headers = {
        'Content-type': 'application/json'
      };
      var req = http.request(options, function(res) {
        //Here we can check if our request was received based on the response.
      });
      req.write(JSON.stringify(match.object));
      req.end();
    });
  });
}