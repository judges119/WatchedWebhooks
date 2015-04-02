# WatchedWebhooks

Polls the GitHub [User Received Events](https://developer.github.com/v3/activity/events/#list-public-events-that-a-user-has-received) endpoint of a provided username. This is matched against a set of rules loaded from rules.js (example provided in rules.js.example) when the application starts. If an event matches a rule, it fires off a POST request to a URL specified in the rule, with the event data as the body of the request. The user will need to create a GitHub application to use this, as the application key/secret is needed to make API requests.

## Use

Start the application with three arguments on the command line:

1. GitHub application key
2. GitHub application secret
3. GitHub username of your user (it will use the public data of your news feed)

For example:

`node server.js 123456GITHUBKEY123456 09876GITHUBSECRET0987 judges119`

## Technology

* [Node.js](https://nodejs.org/)
* [node-github](https://github.com/mikedeboer/node-github)

## Usable Event Types

* IssuesEvent
* PullRequestEvent
* CreateEvent
* DeleteEvent
* CommitCommentEvent
* IssueCommentEvent
* PushEvent
* GollumEvent

## To Do

* Test initial release
* Introduce JSON schema for rules
* Test rules against schema on startup
* Ensure correct number of arguments given with script
* If only a username is provided, allow API use without application (add throttle)