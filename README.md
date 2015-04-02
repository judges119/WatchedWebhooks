# WatchedWebhooks

Polls the GitHub [User Received Events](https://developer.github.com/v3/activity/events/#list-public-events-that-a-user-has-received) endpoint of a provided username. This is matched against a set of rules loaded from rules.js (example provided in rules.js.example) when the application starts. If an event matches a rule, it fires off a POST request to a URL specified in the rule, with the event data as the body of the request.

## Use

Start the application with one argument on the command line:

1. GitHub username of your user (it will use the public data of your news feed)

For example:

`node server.js judges119`

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

## RoadMap

* Greater rule capability
  * More fine-grained choices
  * Boolean logic
* Customisable settings.js file for configuration
* Capability to poll different Event API endpoints
* Multiple endpoint polling
* Web interface
* Hot swapping of configuration (including rules)